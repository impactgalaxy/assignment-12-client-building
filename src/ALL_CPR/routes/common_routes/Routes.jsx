import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import Home from "../../pages/Home/Home";
import ErrorElement from "../../components/ErrorElement";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Dashboard from "../../Dashboard/Dashboard";
import DashHome from "../../Dashboard/dashboard_components/DashHome";

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
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "",
        element: <DashHome />,
      },
    ],
  },
]);
export default router;
// dashboard
