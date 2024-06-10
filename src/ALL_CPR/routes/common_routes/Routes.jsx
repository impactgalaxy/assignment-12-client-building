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
import PaymentHistory from "../../Dashboard/dashboard_components/payment/PaymentHistory";
import MemberRoute from "../private_routes/MemberRoute";

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
        element: (
          <PrivateRoute>
            <ApartmentAgreement />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MakePayment />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <PaymentHistory />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
// dashboard
