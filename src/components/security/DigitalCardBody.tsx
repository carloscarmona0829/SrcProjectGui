import { Box, Paper, Typography, alpha } from "../../adapters";
import { useState } from "../../adapters/ReactAdapter";
import DigitalCardDialog from "./DigitalCardDialog";

export default function DigitalCardBody() {
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
            Carnet
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "8px",
              minHeight: "80px",
              gap: "16px",
            }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              Este es un Carnet Digital.
              <br />
              Escanee el código QR para verificar la validéz.
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
              onClick={() => handleImageClick("1017140829.jpg")}
            >
              <img
                src={"/assets/images/1017140829.jpg"}
                alt="1017140829.jpg"
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
        <DigitalCardDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          imageName={imageName}
        />
      )}
    </>
  );
}
