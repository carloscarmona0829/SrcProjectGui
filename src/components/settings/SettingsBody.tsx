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
              Toque la imagen si desea actualizar el logo.
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
              onClick={() => handleImageClick("Logo.png")}
            >
              <img
                src={"/assets/images/Logo.png"}
                alt="name.png"
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
              Toque la imagen si desea actualizar el Nombre.
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
              onClick={() => handleImageClick("Name.png")}
            >
              <img
                src={"/assets/images/Name.png"}
                alt="name.png"
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
