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
    .oneOf([yup.ref('strPassword')], 'Las contraseñas no coinciden'), 
  });

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
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
      strBirthday: "",
      strPhoneNumber: "",
      strEmail: "",
      strPassword:"",
      strConfirmPassword:"",
      //intPartnerId: undefined,
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
          birthDay: values.strEmail,
          phoneNumber: values.strPhoneNumber,
          email: values.strEmail,
          password: values.strPassword,
          confirmPassword: values.strConfirmPassword,
          //intPartnerId: values.intPartnerId,
        });

        if (!response.data.issuccess) {
         Swal.fire({
          icon: "error",
          title: `<h5>El usuario no fue creado</h5>`,
          html: `<div>
                    ${response.data.result} 
                  <br />
                  <h6><a href="/recuperar-contrasena">Clic aquí para recuper su contraseña</a></h6>
               
                 </div>`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-secondary",
          },
          buttonsStyling: false,
        })
        return;
      }

        Swal.fire({
          icon: "success",
          title: `<h5>El usuario fue creado exitosamente</h5>`,
          html: `<div>
              Tenga en cuenta que los datos para iniciar sesión son:
              <br />
              <hr />
              Usuario: <strong>${values.strEmail.substring(0, values.strEmail.indexOf('@'))}</strong>
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
          navigate(`/?username=${encodeURIComponent(values.strEmail.substring(0, values.strEmail.indexOf('@')))}`);
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
                autoFocus
                value={formik.values.strDni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.strDni && Boolean(formik.errors.strDni)}
                helperText={formik.touched.strDni && formik.errors.strDni}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                select
                id="intPartnerId"
                name="intPartnerId"
                label="Tipo de vinculación"
                fullWidth
                value={formik.values.intPartnerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.intPartnerId &&
                  Boolean(formik.errors.intPartnerId)
                }
                helperText={
                  formik.touched.intPartnerId && formik.errors.intPartnerId
                }
              >
                {partners.map((partner) => (
                  <MenuItem
                    key={partner.intPartnerId}
                    value={partner.intPartnerId?.toString()}
                  >
                    {partner.strDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
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
                error={formik.touched.strFirstName && Boolean(formik.errors.strFirstName)}
                helperText={formik.touched.strFirstName && formik.errors.strFirstName}
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
            {/* <Grid item xs={12}>
              <TextField
                name="strBirthDay"
                id="strBirthDay"
                label="Fecha de Nacimiento"
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
            </Grid> */}
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
                  formik.touched.strPhoneNumber && Boolean(formik.errors.strPhoneNumber)
                }
                helperText={formik.touched.strPhoneNumber && formik.errors.strPhoneNumber}
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
                  formik.touched.strPassword && Boolean(formik.errors.strPassword)
                }
                helperText={formik.touched.strPassword && formik.errors.strPassword}
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strConfirmPassword && Boolean(formik.errors.strConfirmPassword)
                }
                helperText={formik.touched.strConfirmPassword && formik.errors.strConfirmPassword}
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
