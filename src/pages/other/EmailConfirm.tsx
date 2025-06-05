import {
  Avatar,
  axiosClient,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  VerifiedIcon,
} from "../../adapters";
import { useEffect, useRef, useState } from "../../adapters/ReactAdapter";
import EmailConfirmSkeleton from "./EmailConfirmSkeleton";

export default function EmailConfirm() {
  const searchParams = new URLSearchParams(location.search);
  const userid = searchParams.get("userid") || "";
  const validEmailToken = searchParams.get("token") || "";

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<null | string>(null);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const hasBeenCalled = useRef(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    if (hasBeenCalled.current) {
      return;
    }
    hasBeenCalled.current = true;
    try {
      setIsLoading(true);
      const response = await axiosClient.post(
        `/Auth/confirmemail?userid=${userid}&token=${validEmailToken}`
      );

      if (!response.data.issuccess) {
        setEmailConfirm(response.data.isSuccess);
        setMessage(response.data.message);
        return;
      }
      setEmailConfirm(response.data.isSuccess);
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
          <Avatar
            sx={{
              m: 1,
              bgcolor: errorMessage ? "secondary.main" : "primary.main",
            }}
          >
            <VerifiedIcon />
          </Avatar>
          <Typography variant="h5">Validación de correo electrónico</Typography>
          {isLoading ? (
            <EmailConfirmSkeleton />
          ) : errorMessage ? (
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container>
                <Grid
                  item
                  sx={{
                    border: "1px solid",
                    borderRadius: 1,
                    borderColor: "secondary.main",
                    padding: "50px",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize="16px">
                    {errorMessage}
                    <br />
                    <br />
                  </Typography>
                  <Typography fontSize="16px">
                    Ya puede cerrar esta ventana.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ) : emailConfirm ? (
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container>
                <Grid
                  item
                  sx={{
                    border: "1px solid",
                    borderRadius: 1,
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
            </Box>
          ) : (
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container>
                <Grid
                  item
                  sx={{
                    border: "1px solid",
                    borderRadius: 1,
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
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
