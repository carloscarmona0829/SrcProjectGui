import {
  Backdrop,
  Box,
  Divider,
  Grid,
  IconButton,
  LogoutIcon,
  MuiDrawer,
  styled,
  Typography,
  useMediaQuery,
} from "../adapters";
import { useEffect, useState } from "../adapters/ReactAdapter";
import { useUser } from "../hooks";
import AppBar from "./AppBar";
import Menu from "./Menu";
import TopBar from "./TopBar";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: !isSmallScreen && "relative",
      whiteSpace: "nowrap",
      height: "100vh",
      width: 260,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      overflowY: "auto",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0), //width icons-menu < to 'sm' screens
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9), //width icons-menu > to 'sm' screen
        },
      }),
    },
  }));

  const { logout } = useUser();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer variant="permanent" open={open}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box>
            <AppBar open={open} toggleDrawer={toggleDrawer} />
            <Divider />
            <Menu closeDrawer={closeDrawer} />
          </Box>
          <Box
            height={50}
            display={"flex"}
            justifyContent={open ? "flex-end" : "center"}
            alignItems="center"
            color={"white"}
            fontWeight={"bold"}
            sx={{ backgroundColor: "primary.main", cursor: "pointer" }}
            onClick={logout}
          >
            <Divider />
            {open && (
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Salida Segura
              </Typography>
            )}
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
        open={isSmallScreen && open}
        onClick={toggleDrawer}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Grid maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
}
