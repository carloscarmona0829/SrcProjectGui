import { Route, Routes } from "../../adapters/ReactAdapter";
import { Login } from "../../pages";
import { publicRoutes } from "../../routes";

function AuthPublicRoutes() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.id} {...route} />
      ))}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AuthPublicRoutes;
