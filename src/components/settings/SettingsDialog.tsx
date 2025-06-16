import CloseIcon from "@mui/icons-material/Close";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { axiosClient } from "../../adapters";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface SettingsDialogProps {
  open: boolean;
  handleClose: () => void;
  imageName: string;
  refreshList?: () => void;
}
export default function SettingsDialog({
  open,
  handleClose,
  imageName,
}: SettingsDialogProps) {
    
  const validationSchema = Yup.object({
    image: Yup.string().required("La imagen es requerida"),
  });
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        const formData = new FormData();
        if (selectedFile !== null) {
          formData.append("file", selectedFile);
          formData.append("fileName", imageName);
          await axiosClient.post("/Config/ChangeImage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        Swal.fire({
          icon: "success",
          title: `Actualización de ${imageName.replace(".png", "")} Exitosa`,
          confirmButtonText: "ACEPTAR",
          customClass: {
            confirmButton: "btn-outlined-primary",
          },
          buttonsStyling: false,
        }).then(() => {
          window.location.reload();
        });
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
        handleClose();
      }
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      formik.setFieldValue("image", file.name);
      setSelectedFile(file);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontWeight="bold"
        >
          {`Actualizar ${imageName.replace(".png", "")}`}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container direction="row" justifyContent="center" spacing={1}>
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
                value={selectedFile ? selectedFile.name : formik.values.image}
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
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
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
          </Grid>
          <Divider />
          <DialogActions>
            <Button color="secondary" variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary" variant="outlined">
              {formik.isSubmitting ? (
                <CircularProgress size={20} style={{ color: "#008575" }} />
              ) : (
                "Actualizar"
              )}
            </Button>
          </DialogActions>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
