import { useLocation } from "./adapters/ReactAdapter";
import { AuthPrivateRoutes, AuthPublicRoutes } from "./components";
import { useUser } from "./hooks";
import { NotFound } from "./pages";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const { pathname } = useLocation();
  const { user } = useUser();

  const allRoutes = [...privateRoutes, ...publicRoutes];
  const isValidRoute = allRoutes.some((route) => route.path === pathname);

  if (!isValidRoute) {
    return <NotFound />;
  }

  return user?.isLogged ? <AuthPrivateRoutes /> : <AuthPublicRoutes />;
}

export default App;
