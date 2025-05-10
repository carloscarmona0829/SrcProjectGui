import { Grid } from "../../adapters";
import LayoutContent from "../../layout/LayoutContent";

{
  /* Interfaces */
}

export default function Template() {
  return (
    <>
      <LayoutContent title="Título de la página">
        <Grid container direction="column" spacing={2}>
          <Grid item>{/* Header */}</Grid>
          <Grid item>{/* Toolbar */}</Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Body */}
          </Grid>
        </Grid>
      </LayoutContent>
      {/* Modals */}
    </>
  );
}
