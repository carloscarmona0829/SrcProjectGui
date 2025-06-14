import {
  axiosClient,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  ImageSearchIcon,
  InputAdornment,
  Paper,
  Swal,
  TextField,
  useFormik,
} from "../../adapters";
import * as Yup from "yup";
import { useState } from "../../adapters/ReactAdapter";

export default function GuiConfig() {
  const validationSchema = Yup.object({
    fileName: Yup.string().required("Seleccione una imagen para actualizar"),
  });

  const formik = useFormik({
    initialValues: {
      fileName: "",
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
      formik.setFieldValue("fileName", file.name);
      setSelectedFile(file);
    }
  };
  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Grid component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container direction="row">
            <Grid
              item
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                label="Seleccionar imagen"
                required
                variant="outlined"
                sx={{ width: 260 }}
                disabled
                fullWidth
                value={
                  selectedFile ? selectedFile.name : formik.values.fileName
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ p: 0 }}>
                        <ImageSearchIcon sx={{ fontSize: 25 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fileName && Boolean(formik.errors.fileName)
                }
                helperText={formik.touched.fileName && formik.errors.fileName}
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
            <Button type="submit" color="primary" variant="outlined">
              {formik.isSubmitting ? (
                <CircularProgress size={20} style={{ color: "primary" }} />
              ) : (
                "Guardar"
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
