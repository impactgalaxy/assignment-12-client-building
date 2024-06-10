import { Navigate } from "react-router-dom";
import useRole from "../../../others/hooks/useRole";
import Loading from "../../components/shared_components/Loading";
import PropTypes from "prop-types";

export default function MemberRoute({ children }) {
  const { userRole } = useRole();
  if (userRole == undefined) return <Loading></Loading>;
  if (userRole === "member") return children;
  return <Navigate to="/"></Navigate>;
}
MemberRoute.propTypes = {
  children: PropTypes.node,
};
