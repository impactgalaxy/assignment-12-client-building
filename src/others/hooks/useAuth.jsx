import { useContext } from "react";
import { AuthContext } from "../../ALL_CPR/context/AuthProvider";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
