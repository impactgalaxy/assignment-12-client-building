import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./axios/useAxiosCommon";

export default function useAnnouncement() {
  const commonApi = useAxiosCommon();
  const fetchAnnouncement = async () => {
    const response = await commonApi.get("/announcements");
    return response.data;
  };
  const {
    data: announcements = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
  });
  return { announcements, isLoading, refetch };
}
