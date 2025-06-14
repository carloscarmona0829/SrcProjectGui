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
} from "../../adapters";
import { useState } from "../../adapters/ReactAdapter";

export default function GuiConfig() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [logoNameDisplay, setLogoNameDisplay] = useState<string>("");

  const [selectedName, setSelectedName] = useState<File | null>(null);
  const [nameDisplay, setNameDisplay] = useState<string>("");

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedLogo(file);
      setLogoNameDisplay(file.name);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedName(file);
      setNameDisplay(file.name);
    }
  };

 const handleSubmit = async (targetFileName: string) => { // 'targetFileName' es el nombre que el backend espera (ej: "Logo.png")
    let fileToUpload: File | null = null;
    let displayName: string = ""; // Nombre a mostrar en el Swal.fire

    // Determinar qué archivo y nombre usar basado en 'targetFileName'
    if (targetFileName === "Logo.png") {
      fileToUpload = selectedLogo;
      displayName = logoNameDisplay;
    } else if (targetFileName === "Name.png") {
      fileToUpload = selectedName;
      displayName = nameDisplay;
    } else {
        // Manejar un caso inesperado, aunque con los botones definidos esto no debería ocurrir
        console.error("Tipo de archivo desconocido para handleSubmit:", targetFileName);
        return;
    }

    if (!fileToUpload) {
      Swal.fire({
        icon: "warning",
        title: `<h5>Por favor, selecciona un archivo para ${targetFileName.replace('.png', '')}.</h5>`,
        confirmButtonText: "ACEPTAR",
        customClass: {
          confirmButton: "btn-outlined-primary",
        },
        buttonsStyling: false,
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fileName", targetFileName); // Envía el nombre fijo esperado por el backend
      formData.append("file", fileToUpload);      // Envía el archivo específico que fue seleccionado

      await axiosClient.post("/Config/ChangeImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: `Actualización de ${targetFileName} Exitosa`, // Usa el nombre de display o el nombre fijo
        confirmButtonText: "ACEPTAR",
        customClass: {
          confirmButton: "btn-outlined-primary",
        },
        buttonsStyling: true,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error al subir el archivo:", error); // Es bueno loggear el error real
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Grid>
          <Typography variant="body1" mb={1}>
            Actualizar Logo
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
                value={selectedLogo ? selectedLogo.name : logoNameDisplay}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ p: 0 }}>
                        <ImageSearchIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
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
                type="button"
                onClick={() => handleSubmit("Logo.png")}
                color="primary"
                variant="outlined"
                size="large"
              >
                {isLoading ? (
                  <CircularProgress size={20} style={{ color: "primary" }} />
                ) : (
                  <SendIcon />
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="body1" mb={1}>
            Actualizar Nombre
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
                label="Seleccionar Nombre"
                required
                variant="outlined"
                size="small"
                fullWidth
                disabled
                value={selectedName ? selectedName.name : nameDisplay}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ p: 0 }}>
                        <ImageSearchIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleNameChange}
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
                type="button"
                onClick={() => handleSubmit("Name.png")}
                color="primary"
                variant="outlined"
                size="large"
              >
                {isLoading ? (
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
