import { useMsal } from "@azure/msal-react";
import {
  Alert,
  axiosClient,
  Box,
  Button,
  CircularProgress,
  CloseIcon,
  Collapse,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  Visibility,
  VisibilityOff,
} from "../../adapters";
import {
  useEffect,
  useLocation,
  useNavigate,
  useState,
} from "../../adapters/ReactAdapter";
import { loginRequest } from "../../config/msalConfig";
import { useUser } from "../../hooks";
import { Permission, UserInfo } from "../../interfaces";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©  "}
      <Link color="inherit" href="https://demismanos.org/" target="_blank">
        De Mis Manos
      </Link>
      {" 2023. "}
    </Typography>
  );
}

export default function Login() {
  const url = new URL(window.location.href);
  const hostname = url.hostname;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";

  const { changeUser } = useUser();

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      const request = {
        scopes: ["User.Read"],
        account: accounts[0],
      };
      console.log("request", request);
      // instance.acquireTokenSilent(request).then(response => {
      //   fetch('http://tu-dominio.com/api/Auth', {
      //     method: 'GET',
      //     headers: {
      //       'Authorization': `Bearer ${response.accessToken}`
      //     }
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data.Message); // Maneja la respuesta
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
      // });
    }
    console.log("No hay sesiones activas", accounts);
  }, []);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const data = new FormData(event.currentTarget);
      const userName = data.get("usuario") as string;

      // 1. Validar si el usuario es de tu dominio empresarial
      if (userName.endsWith("@demismanos.org")) {
        // 2. Verificar si ya tiene sesión activa en Microsoft
        console.log("Si es un usuario de @demismanos.org");
        try {
          handleLogin();
        } catch (error) {
          console.error("Error durante la autenticación con Azure AD:", error);
          return;
        }
      } else {
        setErrorMessage("Usuario o contraseña inválido.");
        return;
      }

      const response = await axiosClient.post("/auth/login", {
        strUserName: data.get("usuario"),
        strPassword: data.get("password"),
      });
      if (!response.data.issuccess) {
        setErrorMessage(response.data.message);
        return;
      }

      const token = response.data.token;

      // Decodifica el token contemplando caracteres especiales
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const info = JSON.parse(jsonPayload) as UserInfo;
      const age = response.data.expireDate.toString();
      const permissions = response.data.permissions as Permission[];
      const image = response.data.image;

      axiosClient.interceptors.request.use((config) => ({
        ...config,
        headers: {
          ...(config.headers as any),
          Authorization: `bearer ${token}`,
        },
      }));

      changeUser({
        token,
        info,
        age,
        permissions,
        isLogged: true,
        image,
      });

      const redirectPath = localStorage.getItem("redirectPath");

      if (redirectPath) {
        navigate(redirectPath);
      }
    } catch {
      setErrorMessage(
        "Ocurrió un error, contácte al administrador del sistema."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url("/assets/images/FrontLg.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid>
            <img
              src={"/assets/images/Logotipo.png"}
              alt="logotipo.png"
              style={{ maxWidth: "180px", height: "auto" }}
            />
          </Grid>
          <Typography component="h2" variant="h5">
            Bienvenido
          </Typography>
          {hostname !== "app.demismanos.org" && (
            <Alert severity="warning">
              <strong>Atención, Sitio de pruebas</strong>
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
              defaultValue={email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoFocus={Boolean(email)}
              autoComplete="current-password"
              sx={{
                "& input::-ms-reveal": {
                  display: "none",
                },
                "& input::-ms-clear": {
                  display: "none",
                },
              }}
              InputProps={{
                type: showPassword ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid container justifyContent="center" alignItems="center">
              <Link href="/registro">{"Regístrate"}</Link>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={16} style={{ color: "#fff" }} />
                ) : undefined
              }
            >
              Iniciar Sesión
            </Button>

            <Box sx={{ width: "100%" }}>
              <Collapse in={Boolean(errorMessage)}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      size="small"
                      onClick={() => {
                        setErrorMessage(null);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {errorMessage}
                </Alert>
              </Collapse>
            </Box>

            <Copyright sx={{ mt: "5vh" }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
