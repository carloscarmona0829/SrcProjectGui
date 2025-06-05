import { Grid, Paper, Skeleton } from "../../adapters";

export default function EmailConfirmSkeleton() {
  return (
    <Paper
      sx={{ border: '1px solid', borderRadius: 1, borderColor: 'primary.main', padding: 3, marginTop: '30px'}}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Skeleton variant="text" width={450} height={100} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" width={200} />
        </Grid>
      </Grid>
    </Paper>
  );
}
