import {
  AccountCircleIcon,
  Box,
  ChevronLeftIcon,
  IconButton,
  Toolbar,
  Typography,
} from "../adapters";
import { useUser } from "../hooks";

export interface AppBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

export default function AppBar({ open, toggleDrawer }: AppBarProps) {
  const { user } = useUser();

  return (
    <Toolbar>
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon sx={{ color: "gray", fontSize: "2rem" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: open ? "180px" : "130px",
          display: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 1,
          }}
        >
          {open ? (
            <>
              {user?.image ? (
                <img
                  src={`data:image/jpeg;base64,${user.image}`}
                  alt={`${user.info.strDni}.jpg`}
                  style={{
                    marginTop: "5px",
                    borderRadius: "50%",
                    height: "130px",
                    width: "130px",
                    border: "1px",
                    boxShadow: "0px 0px 5px 3px rgba(0, 0, 0, 0.2)",
                  }}
                />
              ) : (
                <IconButton>
                  <AccountCircleIcon
                    sx={{
                      color: "gray",
                      height: "130px",
                      width: "130px",
                    }}
                  />
                </IconButton>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                {user?.info?.strFullName}
              </Typography>
            </>
          ) : (
            <>
              {user?.image ? (
                <img
                  src={`data:image/jpeg;base64,${user.image}`}
                  alt={`${user.info.strDni}.jpg`}
                  style={{
                    marginTop: "60px",
                    borderRadius: "50%",
                    height: "60px",
                    width: "60px",
                  }}
                />
              ) : (
                <IconButton sx={{ mt: 6.5 }}>
                  <AccountCircleIcon
                    sx={{ color: "gray", height: "60px", width: "60px" }}
                  />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
}
