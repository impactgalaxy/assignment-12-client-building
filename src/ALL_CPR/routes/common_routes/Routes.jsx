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
import ManageMembers from "../../Dashboard/Admin/ManageMembers";
import PrivateRoute from "../private_routes/PrivateRoute";
import AdminRoute from "../private_routes/AdminRoute";
import MakeAnnouncement from "../../Dashboard/Admin/MakeAnnouncement";
import Announcements from "../../Dashboard/dashboard_components/Announcements";
import OlderAnnouncement from "../../Dashboard/Admin/OlderAnnouncement";
import ApartmentAgreement from "../../components/apartment/ApartmentAgreement";
import AgreementRequest from "../../Dashboard/Admin/AgreementRequest";
import ManageCoupons from "../../Dashboard/Admin/ManageCoupons";
import MakePayment from "../../Dashboard/dashboard_components/MakePayment";
import PaymentByStripe from "../../Dashboard/dashboard_components/payment/PaymentByStripe";

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
      {
        path: "/apartment-agreement/:id",
        element: <ApartmentAgreement />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashHome />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "agreement-request",
        element: (
          <AdminRoute>
            <AgreementRequest />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "older-announcement",
        element: <OlderAnnouncement />,
      },
      {
        path: "make-payment",
        element: <MakePayment />,
      },
      {
        path: "make-payment/payment-by-stripe",
        element: <PaymentByStripe />,
      },
    ],
  },
]);
export default router;
// dashboard
