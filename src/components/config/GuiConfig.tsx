import {
  axiosClient,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  ImageSearchIcon,
  InputAdornment,
  Paper,
  SendIcon,
  Swal,
  TextField,
  Typography,
  useFormik,
} from "../../adapters";
import * as Yup from "yup";
import { useState } from "../../adapters/ReactAdapter";

export default function GuiConfig() {
  const validationSchema = Yup.object({
    logo: Yup.string().required("Seleccione una imagen"),
  });

  const formik = useFormik({
    initialValues: {
      logo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const formData = new FormData();
        if (selectedFile !== null) {
          formData.append("file", selectedFile);
          await axiosClient.post("/Config/ChangeLogo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          Swal.fire({
            icon: "success",
            title: "Actualización de Logo Exitosa",
            confirmButtonText: "ACEPTAR",
            customClass: {
              confirmButton: "btn-outlined-primary",
            },
            buttonsStyling: true,
          }).then(() => {
            window.location.reload();
          });
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: `<h5>No se pudo procesar la solicitud.</h5>`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-primary",
          },
          buttonsStyling: false,
        });
      }
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      formik.setFieldValue("logo", file.name);
      setSelectedFile(file);
    }
  };
  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Grid component="form" noValidate onSubmit={formik.handleSubmit}>
          <Typography variant="body1" mb={1}>
            Cambiar Logo
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            spacing={1}
            marginBottom={2}
          >
            <Grid
              item
              xs={8}
              sm={8}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField                
                label="Seleccionar Logo"
                required
                variant="outlined"
                size="small"
                fullWidth
                disabled
                value={
                  selectedFile ? selectedFile.name : formik.values.logo
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ p: 0 }}>
                        <ImageSearchIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.logo && Boolean(formik.errors.logo)
                }
                helperText={formik.touched.logo && formik.errors.logo}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                size="large"
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={20} style={{ color: "primary" }} />
                ) : (
                  <SendIcon />
                )}
              </Button>
            </Grid>
          </Grid>          
        </Grid>
      </Paper>
    </>
  );
}
