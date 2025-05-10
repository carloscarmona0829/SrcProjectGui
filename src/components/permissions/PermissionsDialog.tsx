import {
  AccountCircle,
  AssignmentIndIcon,
  axiosClient,
  Box,
  Button,
  CircularProgress,
  CloseIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  PersonIcon,
  Slide,
  Swal,
  TextField,
  TransitionProps,
  WorkspacePremiumIcon,
} from "../../adapters";
import {
  forwardRef,
  ReactElement,
  useState,
} from "../../adapters/ReactAdapter";
import { PermissionByUser } from "../../interfaces";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface PermissionsDialogDialogProps {
  PermissionsDialogDialogInput?: PermissionByUser;
  open: boolean;
  handleClose: () => void;
  refreshPermissions?: () => void;
}

export default function PermissionsDialog({
  PermissionsDialogDialogInput,
  open,
  handleClose,
  refreshPermissions,
}: PermissionsDialogDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelReserve = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      await axiosClient.post("/Authorization/DeletePermissionsByUser", {
        intPermissionId: PermissionsDialogDialogInput?.intPermissionId,
        strUserName: PermissionsDialogDialogInput?.strUserName,
      });

      Swal.fire({
        icon: "success",
        title: `<h3>El permiso ha sido revocado</h3>`,
        showConfirmButton: false,
        timer: 2000,
      });

      refreshPermissions?.();
    } catch {
      Swal.fire({
        icon: "error",
        title: `<h3>Ocurrió un error</h3>`,
        text: "Contacte al administrador del sistema.",
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setIsLoading(false);
      handleClose();
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
          Detalle del permiso
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
        <Grid container direction="row">
          <Grid container direction="row" justifyContent="center" spacing={1}>
            <Grid item>
              <TextField
                disabled
                label="Empleado"
                value={PermissionsDialogDialogInput?.strName}
                sx={{ width: 260 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled
                label="Usuario"
                value={PermissionsDialogDialogInput?.strUserName}
                sx={{ width: 260 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled
                label="Cargo"
                value={
                  PermissionsDialogDialogInput?.strJobTitle
                    ? PermissionsDialogDialogInput?.strJobTitle
                    : "No aplica"
                }
                sx={{ width: 260 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled
                label="Permiso"
                value={PermissionsDialogDialogInput?.strRoute}
                sx={{ width: 260 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkspacePremiumIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCancelReserve}
        >
          {isLoading ? (
            <CircularProgress size={20} style={{ color: "#b23800" }} />
          ) : (
            "Revocar Permiso"
          )}
        </Button>
        <Button color="primary" variant="outlined" onClick={handleClose}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
