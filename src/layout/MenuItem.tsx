import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "../adapters";
import { useNavigate } from "../adapters/ReactAdapter";

export interface MenuItemProps {
  name: string;
  icon: React.ReactElement;
  path?: string;
  active: boolean;
  closeDrawer: () => void;
}

export default function MenuItem({
  name,
  icon,
  path,
  closeDrawer,
}: MenuItemProps) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const navigate = useNavigate();

  const navigateClick = (to?: string) => () => {
    to && navigate(to);
    isSmallScreen && closeDrawer();
  };

  return (
    <ListItemButton onClick={navigateClick(path)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
}
