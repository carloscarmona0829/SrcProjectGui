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
  Link,
  MenuItem,
  Swal,
  TextField,
  Typography,
  useFormik,
  yup,
} from "../../adapters";
import { useNavigate, useState } from "../../adapters/ReactAdapter";
import useGet from "../../hooks/useGet";
import { PartnersList } from "../../interfaces";

export default function SignUp() {
  const navigate = useNavigate();
  const { data: partnersRequest } = useGet<{ result: PartnersList[] }>({
    url: "/Authorization/GetPartners",
  });
  const partners = partnersRequest?.result || [];

  const validationSchema = yup.object({
    strDni: yup
      .string()
      .required("La identificación es requerida")
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(5, "El campo identificación debe tener al menos 5 caracteres"),
    strName: yup.string().required("Los nombres son requeridos"),
    strLastName: yup.string().required("Los apellidos son requeridos"),
    strEmail: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    strPhone: yup
      .string()
      .required("El número de celular es requerido")
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(10, "El número de celular debe tener al menos 10 caracteres"),
    intPartnerId: yup.string().required("Seleccione una opción"),
  });

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      strDni: "",
      strName: "",
      strLastName: "",
      strPhone: "",
      strEmail: "",
      intPartnerId: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axiosClient.post("/Authorization/AddExternalUser", {
          strDni: values.strDni,
          strName: values.strName,
          strLastName: values.strLastName,
          strPhone: values.strPhone,
          strEmail: values.strEmail,
          intPartnerId: values.intPartnerId,
        });

        Swal.fire({
          icon: "success",
          title: `<h5>Usuario guardado con exito!!!</h5>`,
          html: `<div>
              Tenga en cuenta que los datos para iniciar sesión son:
              <br />
              <hr />
              Usuario: <strong>${values.strEmail}</strong>
              <br />
              <hr />
              Contraseña: <strong>${values.strDni}</strong>
              <hr />
              <br />
            </div>`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-primary",
          },
          buttonsStyling: false,
        }).then(() => {
          navigate(`/?email=${encodeURIComponent(values.strEmail)}`);
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
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="strName"
                id="strName"
                label="Nombres"
                required
                fullWidth
                value={formik.values.strName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.strName && Boolean(formik.errors.strName)}
                helperText={formik.touched.strName && formik.errors.strName}
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
            <Grid item xs={12}>
              <TextField
                type="tel"
                name="strPhone"
                id="celular"
                label="Celular"
                required
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.strPhone && Boolean(formik.errors.strPhone)
                }
                helperText={formik.touched.strPhone && formik.errors.strPhone}
              />
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
