import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axios/useAxiosSecure";

export default function useUserCollection() {
  const secureApi = useAxiosSecure();

  const userCollection = async () => {
    const response = await secureApi.get("/users");
    return response.data;
  };
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userCollection,
  });

  return { users, isLoading };
}
