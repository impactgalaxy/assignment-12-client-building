import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axios/useAxiosSecure";

export default function useAgreementRequest() {
  const secureApi = useAxiosSecure();
  const { data: agreementRequest = [], refetch } = useQuery({
    queryKey: ["agreement-request"],
    queryFn: async () => {
      const response = await secureApi("/agreement-apartment");
      return response.data;
    },
  });
  const newRequest = agreementRequest.filter((newReq) => {
    return newReq.status === "Pending";
  });
  return { refetch, newRequest };
}
