import {
  Alert,
  Avatar,
  axiosClient,
  Box,
  Button,
  CircularProgress,
  CloseIcon,
  Collapse,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  PasswordIcon,
  SendIcon,
  Swal,
  TextField,
  Typography,
  useFormik,
  yup,
} from "../../adapters";
import { useState } from "../../adapters/ReactAdapter";

export default function ForgotPassword() {
  const validationSchema = yup.object({
    strEmail: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
  });

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      strEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post(
          `/Auth/ForgetPassword?email=${formik.values.strEmail}`
        );

        if (!response.data.isSuccess) {
          setErrorMessage(response.data.response);
          return;
        }

        Swal.fire({
          icon: "success",
          title: `<h5>El usuario fue encontrado</h5>`,
          html: `<div>
                    Se envió un mensaje de confirmación al correo <strong>${values.strEmail}</strong>.
                    <br />
                    <br />
                    Verifique su correo electrónico y siga los pasos para recuperar su contraseña.          
                  </div>`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-primary",
          },
          buttonsStyling: false,
        });
      } catch {
        setErrorMessage(
          "Ocurrió un error, contácte al administrador del sistema."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
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
          <PasswordIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar Contraseña
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3, width: '100%', maxWidth: "sm" }} 
        >         
          <Grid container spacing={2}>
            <Grid item xs={12}> 
              <TextField
                name="strEmail"
                id="strEmail"
                label="Correo Electrónico"
                required
                fullWidth 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strEmail && Boolean(formik.errors.strEmail)
                }
                helperText={formik.touched.strEmail && formik.errors.strEmail}
              />
            </Grid>      
          </Grid>         
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Grid item xs={12}> 
              <Button
                type="submit"
                fullWidth 
                variant="contained"
                sx={{ mb: 2 }} 
                startIcon={
                  isLoading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : (
                    <SendIcon />
                  )
                }
              >
                Enviar
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ width: "100%" }}>
            <Collapse in={Boolean(errorMessage)}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setErrorMessage(null);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
          </Box>
          <Grid container justifyContent="center">
            <Grid item style={{ textAlign: "center" }}>
              {"Clic aquí para "}
              <Link href="/">Iniciar Sesión</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}