import { Alert, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useReducer } from "react";
import { Moment, yup } from "../../adapters";
import NavLogsBody from "../../components/NavLogs/NavLogsBody";
import NavLogsHeader from "../../components/NavLogs/NavLogsHeader";
import { axiosClient } from "../../config";
import LayoutContent from "../../layout/LayoutContent";
import reducer, { State, initialState } from "./NavLogs.reducer";

export interface NavLogsFilters {
  userName?: string;
  routeName?: string;
  navDate?: Moment;
}

export default function NavLogs() {
  const [state, dispatch] = useReducer<React.Reducer<State, any>>(
    reducer,
    initialState
  );

  const validationSchema = yup.object({});
  const formik = useFormik<NavLogsFilters>({
    initialValues: {
      userName: "",
      routeName: "",
      navDate: moment(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    handleSubmit({
      userName: formik.values.userName,
      routeName: formik.values.routeName,
      navDate: formik.values.navDate,
    });
  }, []);

  const handleSubmit = async (filters: NavLogsFilters) => {
    try {
      const response = await axiosClient.post("/NavLogs/GetNavLogsByUserList", {
        userName: filters.userName,
        routeName: filters.routeName,
        navDate: filters.navDate?.format("YYYY-MM-DD"),
      });
      dispatch({
        type: "change-nav-logs",
        payload: response.data.result,
      });
    } catch (error) {
      dispatch({
        type: "change-error-message",
        payload: true,
      });
    }
  };

  return (
    <>
      <LayoutContent title="Logs de Navegación">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <NavLogsHeader
              formik={formik}
              onClick={() =>
                handleSubmit({
                  userName: formik.values.userName,
                  routeName: formik.values.routeName,
                  navDate: formik.values.navDate,
                })
              }
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
              <NavLogsBody
                navLogs={state.navLogs}
                loading={formik.isSubmitting}
              />
            )}
          </Grid>
        </Grid>
      </LayoutContent>
    </>
  );
}
