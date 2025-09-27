// Asegúrate de tener Moment importado o accesible en este archivo
// Por ejemplo: import moment from 'moment';

import moment from 'moment'; // 👈 Asegúrate de que esta línea esté presente
import { Box, Paper, Typography, axiosClient } from "../../adapters";
import { useEffect, useRef, useState } from "../../adapters/ReactAdapter";
import { useUser } from "../../hooks";
import DigitalCardDialog from "./DigitalCardDialog";

export interface DigitalCardBodyParams {
  strUserId?: string;
  strUserName?: string;
}

// Duración del QR en segundos (2 minutos)
const QR_EXPIRATION_SECONDS = 120;

/**
 * Función Pura para decodificar Base64 a Blob.
 */
const decodeBase64ToBlob = (base64String: string): Blob => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const qrCodeBytes = new Uint8Array(byteNumbers);
  return new Blob([qrCodeBytes], { type: 'image/png' });
};


export default function DigitalCardBody() {
  const [imageName, setImageName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  // 💡 NUEVOS ESTADOS para manejar la expiración con Moment y el tiempo restante a mostrar
  const [expirationTime, setExpirationTime] = useState<moment.Moment | null>(null);
  const [displayTime, setDisplayTime] = useState<number>(QR_EXPIRATION_SECONDS);

  const { user } = useUser();
  const activeQrCodeUrl = useRef<string | null>(null);

  const handleImageClick = (imageName: string) => {
    setImageName(imageName);
    setOpenDialog(true);
  };

  // Función principal para obtener y actualizar el QR
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

      const blob = decodeBase64ToBlob(base64String);
      newObjectUrl = URL.createObjectURL(blob);

      if (activeQrCodeUrl.current) {
        URL.revokeObjectURL(activeQrCodeUrl.current);
      }
      activeQrCodeUrl.current = newObjectUrl;
      setQrCodeUrl(newObjectUrl);

      // 💡 MOMENT.JS: Establece el tiempo de expiración
      setExpirationTime(moment().add(QR_EXPIRATION_SECONDS, 'seconds'));
      setDisplayTime(QR_EXPIRATION_SECONDS); // Resetea el tiempo a mostrar

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


  // --- LÓGICA DE CARGA INICIAL ---

  // 1. USEEFFECT PARA LA CARGA INICIAL (Solo se ejecuta si `user.info.strDni` cambia)
  useEffect(() => {
    if (user?.info?.strDni) {
      handleSubmit({
        strUserId: user.info.strDni,
        strUserName: user.info.strFullName,
      });
    }

    return () => {
      if (activeQrCodeUrl.current) {
        URL.revokeObjectURL(activeQrCodeUrl.current);
        activeQrCodeUrl.current = null;
      }
    };
  }, [user?.info?.strDni]);


  // --- LÓGICA DEL TEMPORIZADOR CON MOMENT ---

  // 2. USEEFFECT PARA EL TEMPORIZADOR (Se ejecuta cada segundo)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (qrCodeUrl && expirationTime) {
      interval = setInterval(() => {
        // 💡 MOMENT.JS: Calcula la diferencia en segundos
        const diffSeconds = expirationTime.diff(moment(), 'seconds');

        // Actualiza el tiempo que se muestra
        setDisplayTime(Math.max(0, diffSeconds));

        // Si la diferencia es <= 0, forzamos la renovación
        if (diffSeconds <= 0 && user?.info?.strDni) {
          clearInterval(interval!);
          handleSubmit({
            strUserId: user.info.strDni,
            strUserName: user.info.strFullName,
          });
        }
      }, 1000);
    }

    // Limpieza del intervalo
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [user, qrCodeUrl, expirationTime]);


  // --- RENDERIZADO ---

  const handleImageError = () => {
    console.error("Error al cargar la imagen QR. La data podría ser inválida.");
    setQrCodeUrl(undefined);
    setError(true);
  };

  if (loading) {
    return <Typography align="center" sx={{ p: 4 }}>Cargando datos del Carnet...</Typography>;
  }

  if (error) {
    return <Typography color="error" align="center" sx={{ p: 4 }}>Error al cargar el carnet digital. Intente de nuevo.</Typography>;
  }

  // Estilos para el contenedor principal de la tarjeta
  const cardStyles = {
    padding: 4,
    borderRadius: '16px',
    maxWidth: 380,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Paper sx={cardStyles}>
        {/* Cabecera y Foto (Zona Superior) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 3,
            paddingBottom: 2,
            borderBottom: '1px solid #eee',
            marginBottom: 3,
          }}
        >
          {/* Detalles del Usuario */}
          <Box sx={{
            flexGrow: 1,
            maxWidth: '65%',
            overflow: 'hidden',
          }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary.main"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.info?.strName || 'Nombres'}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary.main"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.info?.strLastName || 'Apellidos'}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
              ID: {user?.info?.strDni || 'Identificación'} / RH:{user?.info?.strRh || ''}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.disabled"
            >
              {user?.info?.strCargo || 'Oficio actual del colaborador'}
            </Typography>
          </Box>

          {/* Contenedor de la Foto/Avatar */}
          <Box
            sx={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
            onClick={() => handleImageClick(`${user?.info?.strDni}.jpg`)}
          >
            <img
              src={`/assets/images/${user?.info?.strDni}.jpg`}
              alt="Foto de Perfil"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>

        {/* Código QR (Zona Inferior y Central) */}
        <Box
          sx={{
            position: 'relative',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            padding: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          {/* CONTADOR REGRESIVO */}
          {qrCodeUrl && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: 1,
                backgroundColor: displayTime <= 30 ? 'warning.main' : 'primary.main',
                color: 'white',
                textAlign: 'center',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                zIndex: 10,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Válido por: {moment.utc(displayTime * 1000).format('m:ss')} {/* 💡 MOMENT.JS: Formato M:SS */}
              </Typography>
            </Box>
          )}

          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="Código QR de Validación"
              onError={handleImageError}
              style={{
                maxWidth: "80%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                padding: '10px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                marginTop: qrCodeUrl ? '30px' : '0',
              }}
            />
          ) : (
            <Typography variant="body2" color="error">
              No se pudo generar el código QR.
            </Typography>
          )}
        </Box>

        {/* Pie de Página (Opcional) */}
        <Typography variant="caption" align="center" color="text.disabled" sx={{ mt: 2, display: 'block' }}>
          * Documento personal e intransferible *
        </Typography>
      </Paper>

      {openDialog && (
        <DigitalCardDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          imageName={imageName}
        />
      )}
    </Box>
  );
}