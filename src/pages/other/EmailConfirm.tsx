import {
  Avatar,
  axiosClient,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
  VerifiedIcon,
} from "../../adapters";
import { useEffect, useState } from "../../adapters/ReactAdapter";

export default function EmailConfirm() {
  const searchParams = new URLSearchParams(location.search);
  const userid = searchParams.get("userid") || "";
  const validEmailToken = searchParams.get("token") || "";

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const [emailConfirm, setEmailConfirm] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post(
        `/Auth/confirmemail?userid=${userid}&token=${validEmailToken}`
      );

      if (!response.data.issuccess) {
        setEmailConfirm(response.data.issuccess);
        setMessage(response.data.message);
        return;
      }

      setEmailConfirm(response.data.issuccess);
      setMessage(response.data.message);
    } catch {
      setEmailConfirm(false);
      setErrorMessage(
        "Ocurrió un error, contácte al administrador del sistema."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <VerifiedIcon />
          </Avatar>
          <Typography variant="h5">Validación de correo electrónico</Typography>
          {emailConfirm ? <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container>
              <Grid
                item
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  padding: "50px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">
                  {message}
                  <br />
                  <br />
                </Typography>
                <Typography fontSize="16px">
                 Ya puede cerrar esta ventana.
                </Typography>
              </Grid>
            </Grid>
          </Box>: <Box component="form" noValidate sx={{ mt: 3 }}>
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
                <Typography variant="h6">
                  {message}
                  <br />
                  <br />
                </Typography>
                <Typography fontSize="16px">
                 Ya puede cerrar esta ventana.
                </Typography>
              </Grid>
            </Grid>
          </Box>}
        </Box>
      </Container>
    </>
  );
}
