import { Route } from "../interfaces";
import { EmailConfirm, ForgotPassword, Login, ResetPassword, SignUp } from "../pages";
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
  {
    path: "/forgot-password",
    id: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    id: "reset-password",
    element: <ResetPassword />,
  },
];

export default publicRoutes;
