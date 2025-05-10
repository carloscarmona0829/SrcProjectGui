import {
  Button,
  CircularProgress,
  ClearIcon,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  SearchIcon,
  TextField,
  WorkspacePremiumIcon,
} from "../../adapters";

import { AccountCircle } from "@mui/icons-material";

export interface PermissionsHeaderProps {
  formik: any;
  onClick: () => void;
  onClickNewPermission: () => void;
}

export default function PermissionsHeader({
  formik,
  onClick,
  onClickNewPermission,
}: PermissionsHeaderProps) {
  return (
    <>
      <Paper sx={{ padding: 3 }}>
        <Grid container direction="row">
          <Grid container direction="row" justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Usuario"
                name="strUserName"
                autoFocus
                fullWidth
                value={formik.values.strUserName}
                onChange={(event) =>
                  formik.setFieldValue("strUserName", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        onClick={() => {
                          formik.setFieldValue("strUserName", "");
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Permiso"
                name="strRoute"
                fullWidth
                value={formik.values.strRoute}
                onChange={(event) =>
                  formik.setFieldValue("strRoute", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkspacePremiumIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        onClick={() => {
                          formik.setFieldValue("strRoute", "");
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} textAlign={"center"}>
              <Button
                type="submit"
                variant="outlined"
                onClick={onClick}
                endIcon={
                  formik.isSubmitting ? (
                    <CircularProgress
                      size={16}
                      style={{ color: "primary.main" }}
                    />
                  ) : (
                    <SearchIcon />
                  )
                }
              >
                Consultar
              </Button>
            </Grid>
            <Grid item xs={6} md={6} textAlign={"center"}>
              <Button
                type="submit"
                variant="outlined"
                onClick={onClickNewPermission}
                endIcon={<WorkspacePremiumIcon />}
              >
                Nuevo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
