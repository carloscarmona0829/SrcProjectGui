import moment from "../../adapters/MomentAdapter";
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
  FileDownloadDoneIcon,
  Grid,
  HowToRegIcon,
  IconButton,
  InputAdornment,
  Link,
  //MenuItem,
  Swal,
  TextField,
  Typography,
  useFormik,
  yup,
  Visibility,
  VisibilityOff,
  DatePicker,
  LocalizationProvider,
  AdapterMoment,
} from "../../adapters";
import { useNavigate, useState } from "../../adapters/ReactAdapter";
// import useGet from "../../hooks/useGet";
// import { PartnersList } from "../../interfaces";

export default function SignUp() {
  const navigate = useNavigate();
  // const { data: partnersRequest } = useGet<{ result: PartnersList[] }>({
  //   url: "/Authorization/GetPartners",
  // });
  //const partners = partnersRequest?.result || [];

  const validationSchema = yup.object({
    strDni: yup
      .string()
      .required("La identificación es requerida")
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(6, "El campo identificación debe tener al menos 6 caracteres"),
    strFirstName: yup.string().required("Los nombres son requeridos"),
    strLastName: yup.string().required("Los apellidos son requeridos"),
    strBirthday: yup.mixed().nullable(),
    strEmail: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    strPhoneNumber: yup
      .string()
      //.required("El número de celular es requerido")
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(10, "El número de celular debe tener al menos 10 caracteres"),
    //intPartnerId: yup.string().required("Seleccione una opción"),
    strPassword: yup
      .string()
      .required("La contraseña es requerida")
      .min(5, "La contraseña debe tener al menos 5 caracteres"),
    strConfirmPassword: yup
      .string()
      .required("Confirme su contraseña")
      .oneOf([yup.ref("strPassword")], "Las contraseñas no coinciden"),
  });

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

  const formik = useFormik({
    initialValues: {
      strDni: "",
      strFirstName: "",
      strLastName: "",
      strUserName: "",
      strBirthday: null,
      strPhoneNumber: "",
      strEmail: "",
      strPassword: "",
      strConfirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post("/Auth/Register", {
          dni: values.strDni,
          firstName: values.strFirstName,
          lastName: values.strLastName,
          userName: values.strEmail,
          birthDay: values.strBirthday
            ? moment(values.strBirthday).format("YYYY-MM-DD")
            : "",
          phoneNumber: values.strPhoneNumber,
          email: values.strEmail,
          password: values.strPassword,
          confirmPassword: values.strConfirmPassword,
        });

        if (!response.data.isSuccess) {
          Swal.fire({
            icon: "error",
            title: `<h5>El usuario no fue creado</h5>`,
            html: `<div>
                    ${response.data.response} 
                  <br />
                  <h6><a href="/recuperar-contrasena">Clic aquí para recuper su contraseña</a></h6>
               
                 </div>`,
            confirmButtonText: "ACEPTAR",
            customClass: {
              confirmButton: "btn-outlined-secondary",
            },
            buttonsStyling: false,
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: `<h5>El usuario fue creado exitosamente</h5>`,
          html: `<div>
              Se envió un mensaje de confirmación al correo electrónico a <strong>${values.strEmail}</strong>.
              <br />
              <br />
              Tenga en cuenta que después de dicha confirmación, los datos para iniciar sesión son:
              <br />
              <hr />
              Usuario: <strong>${values.strEmail.substring(
                0,
                values.strEmail.indexOf("@")
              )}</strong>
              <br />
              <hr />
              Contraseña: <strong>${values.strPassword}</strong>
              <hr />
              <br />
            </div>`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-primary",
          },
          buttonsStyling: false,
        }).then(() => {
          navigate(
            `/?username=${encodeURIComponent(
              values.strEmail.substring(0, values.strEmail.indexOf("@"))
            )}`
          );
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
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar Usuario
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="strDni"
                id="strDni"
                label="Identificación"
                required
                fullWidth
                value={formik.values.strDni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.strDni && Boolean(formik.errors.strDni)}
                helperText={formik.touched.strDni && formik.errors.strDni}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="strFirstName"
                id="strFirstName"
                label="Nombres"
                required
                fullWidth
                value={formik.values.strFirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strFirstName &&
                  Boolean(formik.errors.strFirstName)
                }
                helperText={
                  formik.touched.strFirstName && formik.errors.strFirstName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="strLastName"
                id="strLastName"
                label="Apellidos"
                required
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strLastName &&
                  Boolean(formik.errors.strLastName)
                }
                helperText={
                  formik.touched.strLastName && formik.errors.strLastName
                }
              />
            </Grid>
            <Grid item xs={12} md={6} textAlign={"center"}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Fecha Nacimiento"
                  value={formik.values.strBirthday}
                  format="DD-MMM-YYYY"
                  slotProps={{
                    textField: {
                      id: "strBirthday",
                      name: "strBirthday",
                      error:
                        formik.touched.strBirthday &&
                        Boolean(formik.errors.strBirthday),
                      fullWidth: true,
                    },
                  }}
                  onChange={(value) =>
                    formik.setFieldValue("strBirthday", value)
                  }
                />
              </LocalizationProvider>
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                type="tel"
                name="strPhoneNumber"
                id="strPhoneNumber"
                label="Celular"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strPhoneNumber &&
                  Boolean(formik.errors.strPhoneNumber)
                }
                helperText={
                  formik.touched.strPhoneNumber && formik.errors.strPhoneNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="strPassword"
                id="strPassword"
                label="Contraseña"
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
                  formik.touched.strPassword &&
                  Boolean(formik.errors.strPassword)
                }
                helperText={
                  formik.touched.strPassword && formik.errors.strPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="strConfirmPassword"
                id="strConfirmPassword"
                label="Confirmar Contraseña"
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
          <Grid item xs={6} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : (
                  <FileDownloadDoneIcon />
                )
              }
            >
              Guardar
            </Button>
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
              {"¿Ya tiene un usuario?"}
              <br />
              {"Clic aquí para "}
              <Link href="/">Iniciar Sesión</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
