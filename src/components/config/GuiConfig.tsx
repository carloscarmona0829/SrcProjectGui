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
    //title: Yup.string().required("El título es requerido"),
    imgName: Yup.string().required("La imagen es requerida"),
  });
  const formik = useFormik({
    initialValues: {
      imgName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosClient.post("/News/CreateNews", {
          imgName: values.imgName,
        });

        const formData = new FormData();
        if (selectedFile !== null) {
          formData.append("file", selectedFile);
          await axiosClient.post("/Utilities/UploadFile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        // Swal.fire({
        //   icon: 'success',
        //   title: isEdit
        //   ? '<h5>Noticia actualizada exitosamente!!!</h5>'
        //   : '<h5>Noticia creada exitosamente!!!</h5>',
        //   confirmButtonText: 'ACEPTAR',
        //   customClass: {
        //     confirmButton: 'btn-outlined-primary'
        //   },
        //   buttonsStyling: false,

        //   timer: 3000
        // })
        // refreshList?.();
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
      } finally {
        //handleClose();
      }
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      formik.setFieldValue("imgName", file.name);
      setSelectedFile(file);
    }
  };
  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Grid 
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}      
        >   
        <Grid container direction="row">
          <Grid
            item
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <TextField
              label="Seleccionar imagen"
              required
              variant="outlined"
              sx={{ width: 260 }}
              disabled
              fullWidth
              value={selectedFile ? selectedFile.name : formik.values.imgName}
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
              error={formik.touched.imgName && Boolean(formik.errors.imgName)}
              helperText={formik.touched.imgName && formik.errors.imgName}
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
          <Button
          type="submit"
          color="primary"
          variant="outlined"
        >
          { formik.isSubmitting ? (
            <CircularProgress size={20} style={{ color: 'primary' }} />
          ) : (
            'Guardar'
          )}
        </Button>
          {/* <Grid container direction="row" justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Usuario"
                name="strUserName"
                autoFocus
                fullWidth
                value={formik.values.strUserName}
                onChange={(event) =>
                  formik.setFieldValue("strUserName", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        onClick={() => {
                          formik.setFieldValue("strUserName", "");
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Permiso"
                name="strRoute"
                fullWidth
                value={formik.values.strRoute}
                onChange={(event) =>
                  formik.setFieldValue("strRoute", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkspacePremiumIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        onClick={() => {
                          formik.setFieldValue("strRoute", "");
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} textAlign={"center"}>
              <Button
                type="submit"
                variant="outlined"
                onClick={onClick}
                endIcon={
                  formik.isSubmitting ? (
                    <CircularProgress
                      size={16}
                      style={{ color: "primary.main" }}
                    />
                  ) : (
                    <SearchIcon />
                  )
                }
              >
                Consultar
              </Button>
            </Grid>
            <Grid item xs={6} md={6} textAlign={"center"}>
              <Button
                type="submit"
                variant="outlined"
                onClick={onClickNewPermission}
                endIcon={<WorkspacePremiumIcon />}
              >
                Nuevo
              </Button>
            </Grid>
          </Grid> */}
        </Grid>
        </Grid>
      </Paper>
    </>
  );
}
