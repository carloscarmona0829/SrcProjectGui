import {
  Alert,
  Box,
  DriveFileRenameOutlineIcon,
  Grid,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
} from "../../adapters";
import { usePagination } from "../../hooks/usePagination";
import { StyledTableCell, StyledTableRow } from "../../hooks/useStyledTable";
import { PermissionByUser } from "../../interfaces";
import PermissionsSkeleton from "./PermissionsSkeleton";

export interface PermissionsBodyProps {
  loading: boolean;
  permissions: PermissionByUser[] | undefined;
  changePermission: (permission: PermissionByUser) => void;
}

export default function PermissionsBody({
  loading,
  permissions,
  changePermission,
}: PermissionsBodyProps) {
  const isScreenWideEnough = useMediaQuery("(min-width: 420px)");

  const {
    page,
    rowsPerPage,
    rowsPerPageOptions,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination({
    totalItems: permissions ? permissions.length : 0,
    rowsPerPageOptions: [5, 15, 25],
  });

  if (loading)
    return (
      <Grid container direction="row" spacing={2}>
        {Array.from(new Array(16)).map((_, index) => {
          return (
            <Grid item key={`loading-${index}`} xs={3}>
              <PermissionsSkeleton />
            </Grid>
          );
        })}
      </Grid>
    );

  return (
    <Grid container direction="row" spacing={2}>
      {permissions && permissions.length > 0 ? (
        <Grid item sx={{ overflow: "auto" }}>
          <Grid
            item
            sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
          >
            <Table size="small" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <strong>Nombre</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    <strong>Usuario</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    <strong>Cargo</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    <strong>Permiso</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    <strong>Info</strong>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions &&
                  permissions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((permissionItem: PermissionByUser) => (
                      <StyledTableRow key={permissionItem.intPermissionId}>
                        <StyledTableCell>
                          {permissionItem.strName}
                        </StyledTableCell>
                        <StyledTableCell>
                          {permissionItem.strUserName}
                        </StyledTableCell>
                        <StyledTableCell>
                          {permissionItem.strJobTitle}
                        </StyledTableCell>
                        <StyledTableCell>
                          {permissionItem.strRoute}
                        </StyledTableCell>
                        <StyledTableCell>
                          <DriveFileRenameOutlineIcon
                            onClick={() => {
                              const selectedPermission = permissions?.find(
                                (permission: PermissionByUser) =>
                                  permission.intPermissionId ===
                                  permissionItem.intPermissionId
                              );
                              if (selectedPermission)
                                changePermission(selectedPermission);
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
            <Box>
              <TablePagination
                component="div"
                rowsPerPageOptions={rowsPerPageOptions}
                count={permissions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="items"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} de ${count !== -1 ? count : `más que ${to}`}`
                }
                showFirstButton={isScreenWideEnough}
                showLastButton={isScreenWideEnough}
                sx={{
                  mt: 2,
                  border: 1,
                  borderColor: "lightgray",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        permissions &&
        permissions.length === 0 && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Alert severity="warning">
              No hay resultados para mostrar de acuerdo a la consulta realizada.
            </Alert>
          </Grid>
        )
      )}
    </Grid>
  );
}
