import { Grid } from "../../adapters";
import { EntranceBody } from "../../components";
import { LayoutContent } from "../../layout";
export default function Entrance() {
  return (
    <>
      <LayoutContent title="Verificación de Acceso">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <EntranceBody />
          </Grid>
        </Grid>
      </LayoutContent>
    </>
  );
}
