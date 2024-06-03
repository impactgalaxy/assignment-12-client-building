import { useQuery } from "@chakra-ui/react";
import useAxiosCommon from "./axios/useAxiosCommon";

export default function useAnnouncement() {
  const commonApi = useAxiosCommon();
  const getAnnouncement = async () => {
    const response = await commonApi.get("/announcements");
    return response.data;
  };
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncement,
  });
  console.log(announcements);
  return { announcements, isLoading };
}
