import { Grid } from "../../adapters";
import { SettingsBody } from "../../components";
import { LayoutContent } from "../../layout";
export default function Settings() {
  return (
    <>
      <LayoutContent title="Configuración GUI">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SettingsBody />
          </Grid>
        </Grid>
      </LayoutContent>
    </>
  );
}
