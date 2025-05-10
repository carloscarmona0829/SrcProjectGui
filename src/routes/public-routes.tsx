import { Route } from "../interfaces";
import { Login, SignUp } from "../pages";
import commonRoutes from "./common-routes";

const publicRoutes: Route[] = [
  ...commonRoutes,
  {
    path: "/",
    id: "login",
    element: <Login />,
  },
  {
    path: "/registro",
    id: "registro",
    element: <SignUp />,
  },
];

export default publicRoutes;
