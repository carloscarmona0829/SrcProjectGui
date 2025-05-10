import { Route, Routes } from "../../adapters/ReactAdapter";
import { useUser } from "../../hooks/useUser";
import Layout from "../../layout/Layout";
import { Home } from "../../pages";
import { privateRoutes } from "../../routes";
import commonRoutes from "../../routes/common-routes";

function AuthPrivateRoutes() {
  const { user } = useUser();

  // Filtramos las rutas buscando únicamente las permitidas
  const allowedRoutes = privateRoutes.filter(
    (route) =>
      // Si la ruta está en el arreglo de "commonRoutes"
      // evitamos la busqueda de los permisos
      commonRoutes.some((commonRoute) => commonRoute.id === route.id) ||
      // Si no, buscamos en los permisos que se encuentre la ruta
      (user?.permissions &&
        user?.permissions.some(
          (permission) =>
            // La ruta puede estar en los modulos o en los submodulos
            permission.strModule === route.id ||
            permission.strSubModules.some(
              (subpermission) => subpermission.strSubModule === route.id
            )
        ))
  );

  return (
    <Layout>
      <Routes>
        {allowedRoutes.map((route) => (
          <Route key={route.id} {...route} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default AuthPrivateRoutes;
