import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../others/hooks/useAuth";
import Loading from "../../components/shared_components/Loading";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading></Loading>;
  if (user !== null) return children;
  return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
