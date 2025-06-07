import { Grid } from "../../adapters";
import {
  GuiConfig,
} from "../../components";
import { LayoutContent } from "../../layout";

export default function Config() {

  return (
    <>
      <LayoutContent title="Configuración GUI">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <GuiConfig />
          </Grid>          
        </Grid>
      </LayoutContent>      
    </>
  );
}
