import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  MenuIcon,
  MuiAppBar,
  AppBarProps as MuiAppBarProps,
  styled,
  Toolbar,
  useMediaQuery,
} from "../adapters";

interface CustomTopBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface TopBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

export default function TopBar({ open, toggleDrawer }: TopBarProps) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const drawerWidth: number = 260;

  const CustomTopBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<CustomTopBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <CustomTopBar
      position="absolute"
      open={open}
      sx={{
        backgroundColor: "primary.main",
        height: "65px",
      }}
    >
      <Toolbar>
        <Grid justifyContent="space-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <RouterLink to="/">
              <img
                src={"/assets/images/LogoLight.png"}
                alt="LogoLight.png"
                style={{
                  maxWidth: "200px",
                  maxHeight: "60px",
                  objectFit: "contain",
                  marginTop: "10px",
                  display: "inline",
                }}
              />
            </RouterLink>
          </Box>
          <Box>
            <RouterLink to="/">
              <img
                src={"/assets/images/NameLight.png"}
                alt="NameLight.png"
                style={{
                  maxWidth: "200px",
                  maxHeight: "60px",
                  objectFit: "contain",
                  marginTop: "10px",
                  display: isSmallScreen && open ? "none" : "inline",
                }}
              />
            </RouterLink>
          </Box>
        </Grid>
      </Toolbar>
    </CustomTopBar>
  );
}
