import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./axios/useAxiosSecure";
import Loading from "../../ALL_CPR/components/shared_components/Loading";

export default function useAdmin() {
  const { user } = useAuth();
  const secureApi = useAxiosSecure();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.uid],
    queryFn: async () => {
      const res = await secureApi.get(`/users/admin/${user?.uid}`);
      return res.data.admin;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return { isAdmin };
}
