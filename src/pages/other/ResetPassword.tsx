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
  InputAdornment,
  Link,
  PasswordIcon,
  SendIcon,
  Swal,
  TextField,
  Typography,
  useFormik,
  Visibility,
  VisibilityOff,
  yup,
} from "../../adapters";
import { useNavigate, useState } from "../../adapters/ReactAdapter";

export default function ResetPassword() {
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";
  const validEmailToken = searchParams.get("token") || "";

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
     strNewPassword: yup
      .string()
      .required("La nueva contraseña es requerida")
      .min(5, "La nueva contraseña debe tener al menos 5 caracteres"),
    strConfirmPassword: yup
      .string()
      .required("Confirme su contraseña")
      .oneOf([yup.ref("strNewPassword")], "Las contraseñas no coinciden"),
  });

  const formik = useFormik({
    initialValues: {
      strNewPassword: "",
      strConfirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        params.append("Email", email);
        params.append("Token", validEmailToken);
        params.append("NewPassword", values.strNewPassword);
        params.append("ConfirmPassword", values.strConfirmPassword);

        const response = await axiosClient.post(
          "/Auth/ResetPassword", params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (!response.data.isSuccess) {
          setErrorMessage(response.data.message);
          return;
        }

        Swal.fire({
          icon: "success",
          title: `<h5>${response.data.message}</h5>`,
          html: `<div>                    
                    Ahora puedes iniciar sesión con tu nueva contraseña.         
                  </div>`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-primary",
          },
          buttonsStyling: false,
        }).then(() => {
          navigate('/')
          })
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
          marginTop: 25,
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
          sx={{ mt: 3, width: "100%", maxWidth: "sm" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="strNewPassword"
                id="strNewPassword"
                label="Nueva contraseña"
                required
                fullWidth
                sx={{
                  "& input::-ms-reveal": {
                    display: "none",
                  },
                  "& input::-ms-clear": {
                    display: "none",
                  },
                }}
                InputProps={{
                  type: showPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strNewPassword &&
                  Boolean(formik.errors.strNewPassword)
                }
                helperText={
                  formik.touched.strNewPassword && formik.errors.strNewPassword
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={0}>
            <Grid item xs={12}>
              <TextField
                name="strConfirmPassword"
                id="strConfirmPassword"
                label="Confirmar contraseña"
                required
                fullWidth
                sx={{
                  "& input::-ms-reveal": {
                    display: "none",
                  },
                  "& input::-ms-clear": {
                    display: "none",
                  },
                }}
                InputProps={{
                  type: showConfirmPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strConfirmPassword &&
                  Boolean(formik.errors.strConfirmPassword)
                }
                helperText={
                  formik.touched.strConfirmPassword &&
                  formik.errors.strConfirmPassword
                }
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
