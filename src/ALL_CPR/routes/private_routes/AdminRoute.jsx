import PropTypes from "prop-types";
import Loading from "../../components/shared_components/Loading";
import { Navigate } from "react-router-dom";
import useAdmin from "../../../others/hooks/useAdmin";
export default function AdminRoute({ children }) {
  const { isAdmin } = useAdmin();
  if (isAdmin == undefined) return <Loading />;
  if (isAdmin) return children;
  return <Navigate to="/"></Navigate>;
}
AdminRoute.propTypes = {
  children: PropTypes.node,
};
