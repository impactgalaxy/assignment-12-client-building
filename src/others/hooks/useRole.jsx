import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axios/useAxiosSecure";
import useAuth from "./useAuth";
import Loading from "../../ALL_CPR/components/shared_components/Loading";

export default function useRole() {
  const { user } = useAuth();
  const secureApi = useAxiosSecure();

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["userRole", user?.uid],
    queryFn: async () => {
      const res = await secureApi.get(`/users/role/${user?.uid}`);
      return res.data.role;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return { userRole };
}
