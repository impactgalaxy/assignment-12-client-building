import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axios/useAxiosSecure";
import useAuth from "./useAuth";

export default function useMemberApartment() {
  const { user } = useAuth();
  const secureApi = useAxiosSecure();
  const { data: myRequest = [], isLoading } = useQuery({
    queryKey: ["my-request"],
    queryFn: async () => {
      const response = await secureApi(`/agreement-apartment/${user?.uid}`);
      return response.data;
    },
  });
  return { myRequest, isLoading };
}
