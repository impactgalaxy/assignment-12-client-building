import PropTypes from "prop-types";
import useUserCollection from "../../../others/hooks/useUserCollection";
import useAuth from "../../../others/hooks/useAuth";
import Loading from "../../components/shared_components/Loading";
import { Navigate } from "react-router-dom";
export default function AdminRoute({ children }) {
  const { userRole, isLoading } = useUserCollection();
  const { user, loading } = useAuth();
  if (loading || isLoading) return <Loading />;
  if (user && userRole?.role === "admin") return children;
  return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
}
AdminRoute.propTypes = {
  children: PropTypes.node,
};
