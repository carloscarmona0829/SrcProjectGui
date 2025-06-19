import { Box, Paper, Typography, alpha } from "../../adapters";
import { useState } from "../../adapters/ReactAdapter";
import SettingsDialog from "./SettingsDialog";

export default function SettingsBody() {
  const [imageName, setImageName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleImageClick = (imageName: string) => {
    setImageName(imageName);
    setOpenDialog(true);
  };

  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Icono
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Icono de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("Favicon.png")}
            >
              <img
                src={"/assets/images/Favicon.png"}
                alt="Favicon.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
         <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Background
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Background de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("Background.png")}
            >
              <img
                src={"/assets/images/Background.png"}
                alt="Background.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
         <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Logotipo
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Logotipo de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("Logotipo.png")}
            >
              <img
                src={"/assets/images/Logotipo.png"}
                alt="Logotipo.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Logo
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Logo de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:"primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("Logo.png")}
             >
              <img
                src={"/assets/images/Logo.png"}
                alt="Logo.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Nombre
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Nombre de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:"primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("Name.png")}
            >
              <img
                src={"/assets/images/Name.png"}
                alt="Name.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Logo Oscuro
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Logo Oscuro de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:"primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("LogoDark.png")}
             >
              <img
                src={"/assets/images/LogoDark.png"}
                alt="LogoDark.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" mb={1}>
            Actualizar Nombre Oscuro
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px 14px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Toque la imagen si desea actualizar el Nombre Oscuro de la aplicación.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:"primary.main",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                },
                width: "150px",
                height: "80px",
                overflow: "hidden",
                padding: "5px",
              }}
              onClick={() => handleImageClick("NameDark.png")}
            >
              <img
                src={"/assets/images/NameDark.png"}
                alt="NameDark.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
      {openDialog && (
        <SettingsDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          imageName={imageName}
        />
      )}
    </>
  );
}
