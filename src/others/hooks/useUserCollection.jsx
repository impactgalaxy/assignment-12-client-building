import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axios/useAxiosSecure";
import useAuth from "./useAuth";

export default function useUserCollection() {
  const secureApi = useAxiosSecure();
  const { user } = useAuth();

  const userCollection = async () => {
    const response = await secureApi.get("/users");
    return response.data;
  };
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userCollection,
  });
  const totalMember = users.filter((user) => user.role === "member");
  const generalUser = users.filter((user) => user.role === "user");
  const userRole = users.find((data) => data.uid === user?.uid);

  return { users, isLoading, totalMember, generalUser, userRole, refetch };
}
