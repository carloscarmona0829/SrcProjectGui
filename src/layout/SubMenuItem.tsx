import {
  Collapse,
  KeyboardArrowDownIcon,
  KeyboardArrowRightIcon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  colors,
  useMediaQuery,
} from "../adapters";
import { useNavigate } from "../adapters/ReactAdapter";
import { MenuItem } from "../interfaces";

export interface SubMenuItemProps {
  name: string;
  icon: React.ReactElement;
  submenus: MenuItem[];
  open: boolean;
  isMenuActive: (path?: string) => boolean;
  handleToggle: () => void;
  closeDrawer: () => void;
}

export default function SubMenuItem({
  name,
  icon,
  submenus,
  open,
  isMenuActive,
  handleToggle,
  closeDrawer,
}: SubMenuItemProps) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const navigate = useNavigate();

  const navigateClick = (to?: string) => () => {
    to && navigate(to);
    isSmallScreen && closeDrawer();
  };

  return (
    <>
      <ListItemButton onClick={handleToggle}>
        <ListItemIcon sx={{ color: colors.grey[700], fontWeight: "bold" }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography sx={{ color: colors.grey[700], fontWeight: "bold" }}>
              {name}
            </Typography>
          }
        />
        {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="nav">
          {submenus.map((menuItem) => {
            const active = isMenuActive(menuItem.path);

            return (
              <ListItemButton
                key={menuItem.id}
                onClick={() => {
                  navigateClick(menuItem.path)();
                }}
                sx={{
                  backgroundColor: active ? colors.grey[200] : "transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                    marginLeft: 1,
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
