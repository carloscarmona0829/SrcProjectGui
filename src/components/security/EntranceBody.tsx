import { Box, Button, Paper, Typography } from '@mui/material';
import { BrowserMultiFormatReader } from '@zxing/browser';
import {
  BarcodeFormat,
  DecodeHintType
} from '@zxing/library';
import { useEffect, useRef, useState } from 'react';

export default function MultiFormatScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [videoWidth, setVideoWidth] = useState(640); // Valores iniciales ajustados
  const [videoHeight, setVideoHeight] = useState(360); // Valores iniciales ajustados
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.PDF_417,
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.DATA_MATRIX
    ]);

    const codeReader = new BrowserMultiFormatReader(hints);

    if (isScanning && videoRef.current) {
      // Se usa decodeFromConstraints para especificar la resolución
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment" // Usa la cámara trasera si está disponible
        }
      };
      codeReader.decodeOnceFromConstraints(constraints, videoRef.current)
        .then(res => {
          setResult(res.getText());
          setIsScanning(false);
        })
        .catch(err => {
          console.error("Error al escanear:", err);
          setIsScanning(false);
        });
    }

    return () => {
      // El lector se detiene automáticamente después de la decodificación
    };
  }, [isScanning]);

  // Manejadores de eventos para redimensionar el contenedor
  const handleStartResize = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
    if ('touches' in e) {
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else {
      setStartPos({ x: e.clientX, y: e.clientY });
    }
    setStartSize({ width: videoWidth, height: videoHeight });
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizing) return;
      let newWidth, newHeight;
      if ('touches' in e) {
        newWidth = startSize.width + (e.touches[0].clientX - startPos.x);
        newHeight = startSize.height + (e.touches[0].clientY - startPos.y);
      } else {
        newWidth = startSize.width + (e.clientX - startPos.x);
        newHeight = startSize.height + (e.clientY - startPos.y);
      }

      setVideoWidth(Math.max(100, Math.min(1280, newWidth)));
      setVideoHeight(Math.max(50, Math.min(720, newHeight)));
    };

    const handleStopResize = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMove as (e: MouseEvent) => void);
      window.addEventListener('touchmove', handleMove as (e: TouchEvent) => void);
      window.addEventListener('mouseup', handleStopResize);
      window.addEventListener('touchend', handleStopResize);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove as (e: MouseEvent) => void);
      window.removeEventListener('touchmove', handleMove as (e: TouchEvent) => void);
      window.removeEventListener('mouseup', handleStopResize);
      window.removeEventListener('touchend', handleStopResize);
    };
  }, [isResizing, startPos, startSize]);

  return (
    <Paper sx={{ padding: '1.5rem', borderRadius: '4px' }}>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        Escáner de múltiples formatos
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        {isScanning ? (
          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              width: `${videoWidth}px`,
              height: `${videoHeight}px`,
              cursor: isResizing ? 'se-resize' : 'default',
              border: '1px dashed #ccc',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              playsInline
              autoPlay
            />
            <Box
              onMouseDown={handleStartResize}
              onTouchStart={handleStartResize}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 20,
                height: 20,
                cursor: 'se-resize'
              }}
            />
          </Box>
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