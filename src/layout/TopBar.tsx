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
  const isCustomScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.between(600, 745)
  );

  const drawerWidth: number = isSmallScreen ? 260 : 275;

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
        marginRight: isSmallScreen ? "0px" : "15px",
      }}
    >
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid
            item
            xs={1}
            container
            justifyContent="flex-start"
            alignItems="center"
          >
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
          <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <RouterLink to="/">
                <img
                  src={"/assets/images/Logo.png"}
                  alt="logo-white.png"
                  style={{
                    maxWidth: "75px",
                    height: "auto",
                    marginTop: open ? "17px" : "0px",
                    marginRight: "2px",
                    display:
                      (isSmallScreen && !open) || (isCustomScreen && open)
                        ? "inline"
                        : "inline",
                  }}
                />
                <img
                  src={"/assets/images/Name.png"}
                  alt="name.png"
                  style={{
                    maxWidth: "95px",
                    height: "auto",
                    marginTop: "15px",
                    display: isSmallScreen && open ? "none" : "inline",
                  }}
                />
              </RouterLink>
            </Box>
          </Grid>
          <Grid
            item
            xs={1}
            container
            display={"flex"}
            justifyContent="flex-end"
            alignItems="center"
          ></Grid>
        </Grid>
      </Toolbar>
    </CustomTopBar>
  );
}
