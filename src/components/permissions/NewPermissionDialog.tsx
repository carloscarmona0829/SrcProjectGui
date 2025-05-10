import {
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
  FileDownloadDoneIcon,
  Grid,
  IconButton,
  MenuItem,
  Slide,
  Swal,
  TextField,
  TransitionProps,
  useFormik,
  yup,
} from "../../adapters";
import { forwardRef, Reducer, useReducer } from "../../adapters/ReactAdapter";
import useGet from "../../hooks/useGet";
import { RoutesList, UsersList } from "../../interfaces";
import { initialState, reducer, State } from "../../pages";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export interface NewPermissionsDialogProps {
  open: boolean;
  handleClose: () => void;
  refreshPermissions?: () => void;
}

export interface NewPermissionFilters {
  strDni?: string;
  strUserName?: string;
  strFullName?: string;
  intRouteId?: string;
  strRouteName?: string;
}

export default function PermissionsDialogDialog({
  open,
  handleClose,
  refreshPermissions,
}: NewPermissionsDialogProps) {
  const [, dispatch] = useReducer<Reducer<State, any>>(reducer, initialState);

  const { data: usuariosRequest, error: usuariosRequestError } = useGet<{
    result: UsersList[];
  }>({
    url: "/authorization/getUser",
  });
  const usersList = usuariosRequest?.result || [];

  const { data: routesRequest, error: routesRequestError } = useGet<{
    result: RoutesList[];
  }>({
    url: "/authorization/GetRoutes",
  });
  const routesList = routesRequest?.result || [];

  const validationSchema = yup.object({
    strDni: yup.string().required("El usuario es requerido."),
    intRouteId: yup.string().required("El permiso es requerido."),
  });
  const formik = useFormik<NewPermissionFilters>({
    initialValues: {
      strDni: "",
      strUserName: "",
      strFullName: "",
      intRouteId: "",
      strRouteName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosClient.post("/authorization/AddPermissionsByUser", {
          intPermissionId: values.intRouteId,
          strUserName: values.strUserName,
        });

        if (usuariosRequestError || routesRequestError) return;

        Swal.fire({
          icon: "success",
          title: `<h3>El permiso ha sido concedido.</h3>`,
          showConfirmButton: false,
          timer: 2000,
        });
        refreshPermissions?.();
      } catch (error) {
        dispatch({
          type: "change-error-message",
          payload: true,
        });
      } finally {
        handleClose();
      }
    },
  });

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
          {"Nuevo Permiso"}
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
            <Grid item>
              <TextField
                select
                id="strDni"
                name="strDni"
                label="Usuario"
                required
                sx={{ width: 260 }}
                value={formik.values.strDni}
                onChange={(event) => {
                  const selectedUser = usersList.find(
                    (user) => user.strDni.toString() === event.target.value
                  );
                  formik.setFieldValue(
                    "strUserName",
                    selectedUser ? selectedUser.strUserName : ""
                  );
                  formik.handleChange(event);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.strDni && Boolean(formik.errors.strDni)}
                helperText={formik.touched.strDni && formik.errors.strDni}
              >
                {usersList &&
                  usersList.map((user: UsersList) => (
                    <MenuItem key={user.strDni} value={user.strDni}>
                      {user.strFullName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                select
                id="intRouteId"
                name="intRouteId"
                label="Permiso"
                required
                sx={{ width: 260 }}
                value={formik.values.intRouteId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.intRouteId && Boolean(formik.errors.intRouteId)
                }
                helperText={
                  formik.touched.intRouteId && formik.errors.intRouteId
                }
              >
                {routesList &&
                  routesList.map((route: RoutesList) => (
                    <MenuItem key={route.intRouteId} value={route.intRouteId}>
                      {route.strRouteName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: "20px" }} />
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              endIcon={
                formik.isSubmitting ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : (
                  <FileDownloadDoneIcon />
                )
              }
            >
              Autorizar
            </Button>
          </DialogActions>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
