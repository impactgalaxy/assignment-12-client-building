import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./axios/useAxiosCommon";

export default function useAnnouncement() {
  const commonApi = useAxiosCommon();
  const fetchAnnouncement = async () => {
    const response = await commonApi.get("/announcements");
    console.log(response);
    return response.data;
  };
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
  });
  console.log(announcements);
  return { announcements, isLoading };
}
