import { Alert, axiosClient, Grid, useFormik, yup } from "../../adapters";
import { useEffect, useReducer } from "../../adapters/ReactAdapter";
import {
  NewPermissionDialog,
  PermissionsBody,
  PermissionsDialog,
  PermissionsHeader,
} from "../../components";
import { PermissionByUser } from "../../interfaces";
import { LayoutContent } from "../../layout";
import reducer, { initialState, State } from "./Permissions.reducer";

export interface PermissionsFilters {
  strUserName?: string;
  strRoute?: string;
}

export default function Permissions() {
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    reducer,
    initialState
  );

  const validationSchema = yup.object({});
  const formik = useFormik<PermissionsFilters>({
    initialValues: {
      strUserName: "",
      strRoute: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    handleSubmit({
      strUserName: formik.values.strUserName,
      strRoute: formik.values.strRoute,
    });
  }, []);

  const handleSubmit = async (filters: PermissionsFilters) => {
    try {
      dispatch({
        type: "change-loading",
        payload: true,
      });
      const response = await axiosClient.post(
        "/authorization/GetPermissionsByUser",
        {
          strUserName: filters.strUserName,
          strRoute: filters.strRoute,
        }
      );
      dispatch({
        type: "change-permissions",
        payload: response.data.result,
      });
    } catch (error) {
      dispatch({
        type: "change-error-message",
        payload: true,
      });
    } finally {
      dispatch({
        type: "change-loading",
        payload: false,
      });
    }
  };

  return (
    <>
      <LayoutContent title="Permisos por usuario">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <PermissionsHeader
              formik={formik}
              onClick={() =>
                handleSubmit({
                  strUserName: formik.values.strUserName,
                  strRoute: formik.values.strRoute,
                })
              }
              onClickNewPermission={() => {
                dispatch({
                  type: "change-open-new-permission-dialog",
                  payload: true,
                });
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {state.errorMessage ? (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Alert severity="error">
                  {"Ocurrió un error, contácte al administrador del sistema."}
                </Alert>
              </Grid>
            ) : (
              <PermissionsBody
                loading={state.loading}
                permissions={state.permissions}
                changePermission={(permission: PermissionByUser) => {
                  dispatch({
                    type: "change-selected-permission",
                    payload: permission,
                  });
                  dispatch({
                    type: "change-open-permission-dialog",
                    payload: true,
                  });
                }}
              />
            )}
          </Grid>
        </Grid>
      </LayoutContent>
      {state.openNewPermissionDialog && (
        <NewPermissionDialog
          open={state.openNewPermissionDialog}
          handleClose={() =>
            dispatch({
              type: "change-open-new-permission-dialog",
              payload: false,
            })
          }
          refreshPermissions={() => formik.submitForm()}
        />
      )}
      {state.openPermissionDialog && (
        <PermissionsDialog
          open={state.openPermissionDialog}
          handleClose={() =>
            dispatch({
              type: "change-open-permission-dialog",
              payload: false,
            })
          }
          PermissionsDialogDialogInput={state.selectedPermission}
          refreshPermissions={() => formik.submitForm()}
        />
      )}
    </>
  );
}
