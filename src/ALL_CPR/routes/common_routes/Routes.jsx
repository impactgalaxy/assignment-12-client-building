import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import Home from "../../pages/Home/Home";
import ErrorElement from "../../components/ErrorElement";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Dashboard from "../../Dashboard/Dashboard";
import DashHome from "../../Dashboard/dashboard_components/DashHome";
import MyProfile from "../../Dashboard/dashboard_components/MyProfile";
import Apartments from "../../pages/apartments/Apartments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/apartments",
        element: <Apartments />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashHome />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
]);
export default router;
// dashboard
