import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  GppBadIcon,
  Grid,
  Typography,
} from "../../adapters";
//import { useLocation } from "../../adapters/ReactAdapter";

export default function NotFound() {
  // const location = useLocation();
  // const currentPath = location.pathname;

  // const handleClick = () => {
  //   localStorage.setItem("redirectPath", currentPath);
  // };
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <GppBadIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Alerta
          </Typography>
          <Box
            component="form"
            noValidate
            //onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container>
              <Grid
                item
                sx={{
                  border: "1px solid",
                  borderColor: "secondary.main",
                  padding: "50px",
                  textAlign: "center",
                }}
              >
                <Typography component="h1" variant="h6">
                  Error 404
                  <br />
                  Ruta no encontrada
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
