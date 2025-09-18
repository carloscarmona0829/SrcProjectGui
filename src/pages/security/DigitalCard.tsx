import { Grid } from "../../adapters";
import { DigitalCardBody } from "../../components";
import { LayoutContent } from "../../layout";
export default function DigitalCard() {
  return (
    <>
      <LayoutContent title="Carnet Digital">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <DigitalCardBody />
          </Grid>
        </Grid>
      </LayoutContent>
    </>
  );
}
