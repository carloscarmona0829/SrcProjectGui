import { Box, Button, Paper, Typography } from '@mui/material';
import { BrowserPDF417Reader } from '@zxing/browser';
import { useEffect, useRef, useState } from 'react';

export default function Pdf417Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserPDF417Reader();

    if (isScanning && videoRef.current) {
      codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current)
        .then(res => {
          setResult(res.getText());
          setIsScanning(false); // cámara se detiene automáticamente
        })
        .catch(err => {
          console.error("Error al escanear:", err);
          setIsScanning(false);
        });
    }

    return () => {
      // No necesitas detener manualmente la cámara con decodeOnceFromVideoDevice
    };
  }, [isScanning]);

  return (
    <Paper sx={{ padding: '1.5rem', borderRadius: '4px' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        Escáner PDF417
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        {isScanning ? (
          <video ref={videoRef} style={{ width: '100%', aspectRatio: '16/9', borderRadius: '4px' }} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Haz clic en "Iniciar escáner" para activar la cámara.
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={() => setIsScanning(!isScanning)}
          sx={{ borderRadius: '9999px', textTransform: 'none' }}
        >
          {isScanning ? "Detener escáner" : "Iniciar escáner"}
        </Button>

        {result && (
          <Box sx={{ marginTop: '1rem', border: '1px solid lightgray', borderRadius: '4px', padding: '1rem', width: '100%' }}>
            <Typography variant="h6">Código detectado:</Typography>
            <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>{result}</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
