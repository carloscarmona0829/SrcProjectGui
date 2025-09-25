import { Box, Paper, Typography, alpha, axiosClient } from "../../adapters";
import { useEffect, useRef, useState } from "../../adapters/ReactAdapter";
import { useUser } from "../../hooks";
import DigitalCardDialog from "./DigitalCardDialog";

export interface DigitalCardBodyParams {
  strUserId?: string;
  strUserName?: string;
}

export default function DigitalCardBody() {
  const [imageName, setImageName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { user } = useUser();

  const activeQrCodeUrl = useRef<string | null>(null);

  const handleImageClick = (imageName: string) => {
    setImageName(imageName);
    setOpenDialog(true);
  };

  useEffect(() => {
    handleSubmit({
      strUserId: user?.info?.strDni && user.info.strDni,
      strUserName: user?.info?.strFullName && user.info.strFullName,
    });

    console.log(user?.info?.strFullName && user.info.strFullName, user?.info?.strDni && user.info.strDni)

    return () => {
      if (activeQrCodeUrl.current) {
        URL.revokeObjectURL(activeQrCodeUrl.current);
        activeQrCodeUrl.current = null;
      }
    };
  }, []);

  const handleSubmit = async (filters: DigitalCardBodyParams) => {

    let newObjectUrl: string | null = null;

    try {
      setLoading(true);
      setError(false);

      const response = await axiosClient.post(
        "/InOut/Card",
        {
          strUserId: filters.strUserId,
          strUserName: filters.strUserName,
        },
      );

      if (response.status !== 200 || !response.data.isSuccess) {
        console.error("Error del servidor:", response.data.message);
        throw new Error(`Error al obtener QR: ${response.data.message}`);
      }

      const base64String = response.data.response;

      if (!base64String) {
        throw new Error("El servidor no devolvió la cadena Base64 de la imagen.");
      }

      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const qrCodeBytes = new Uint8Array(byteNumbers);

      const blob = new Blob([qrCodeBytes], { type: 'image/png' });
      newObjectUrl = URL.createObjectURL(blob);

      if (activeQrCodeUrl.current) {
        URL.revokeObjectURL(activeQrCodeUrl.current);
      }
      activeQrCodeUrl.current = newObjectUrl;
      setQrCodeUrl(newObjectUrl);

    } catch (error) {
      console.error("Error en handleSubmit:", error);

      const urlToRevoke = newObjectUrl || activeQrCodeUrl.current;
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }

      activeQrCodeUrl.current = null;
      setQrCodeUrl(undefined);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    console.error("😱 ERROR DE CARGA DE IMAGEN: El navegador no pudo decodificar el PNG de la URL de Blob. La data recibida es probablemente corrupta o no es un PNG válido.");
    // Opcional: podrías establecer error(true) aquí, pero esto ya es un diagnóstico.
    setQrCodeUrl(undefined);
  };

  if (loading) {
    return <Typography>Cargando código QR...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error al cargar el carnet digital. Intente de nuevo.</Typography>;
  }

  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Box mb={2}>
          {/* <Typography variant="body1" mb={1}>
            Carnet
          </Typography> */}
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
              {user?.info?.strName && user.info.strName}
              <br />
              {user?.info?.strLastName && user.info.strLastName}
              <br />
              {user?.info?.strDni && user.info.strDni}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              height: "200px",
            }}
          >
            <img
              src={qrCodeUrl}
              alt="Código QR.png"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
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