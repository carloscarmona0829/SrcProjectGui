import { Grid, Typography, useMediaQuery } from "../../adapters";
import { useUser } from "../../hooks";

export default function Home() {
  const { user } = useUser();

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  return (
    <>
      <Grid
        height={"100vh"}
        sx={{
          backgroundImage: `url("/assets/images/Background.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: isSmallScreen ? "flex-start" : "flex-end",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "rgba(242, 244, 244, 0.7)",
            borderRadius: isSmallScreen ? "0 10px 10px 0" : "10px 0 0 10px",
            height: "80px",
            padding: "10px",
            textAlign: "center",
            marginTop: "90px",
          }}
        >
          <Typography fontSize={16} color={"#616A6B"}>
            {`Te damos la bienvenida `}
            <br />
          </Typography>
          <Typography fontSize={24} fontWeight={"Bold"} color={"#424949"}>
            {user?.info?.strFullName && user.info.strFullName}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
