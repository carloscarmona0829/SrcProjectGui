import { Alert, AlertTitle, Grid, Typography } from "../adapters";

export interface LayoutContentProps {
  title: string;
  children: React.ReactNode;
}

export default function LayoutContent({ title, children }: LayoutContentProps) {
  const url = new URL(window.location.href);
  const hostname = url.hostname;

  return (
    <Grid marginTop={10} marginLeft={2} marginRight={2}>
      {hostname !== "app.demismanos.org" && (
        <Alert severity="warning">
          <AlertTitle>
            <strong>Atención, este es un sitio de prueba</strong>
          </AlertTitle>
          ¡ Tenga en cuenta que las operaciones que se realicen aquí, no tendrán
          ninguna validéz !
        </Alert>
      )}
      <Grid item>
        <Typography variant="h6" marginBottom={2}>
          {title}
        </Typography>
      </Grid>
      <Grid item sx={{ height: "100%" }}>
        {children}
      </Grid>
    </Grid>
  );
}
