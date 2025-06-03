import { Route } from "../interfaces";
import { EmailConfirm, Login, SignUp } from "../pages";
import commonRoutes from "./common-routes";

const publicRoutes: Route[] = [
  ...commonRoutes,
  {
    path: "/",
    id: "login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    id: "sign-up",
    element: <SignUp />,
  },
  {
    path: "/confirm-email",
    id: "confirm-email",
    element: <EmailConfirm />,
  },
];

export default publicRoutes;
