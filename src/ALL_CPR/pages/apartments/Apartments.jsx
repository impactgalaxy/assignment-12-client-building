import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosCommon from "../../../others/hooks/axios/useAxiosCommon";
import Loading from "../../components/shared_components/Loading";
import Apartment from "../../components/apartment/Apartment";

export default function Apartments() {
  const commonApi = useAxiosCommon();
  const fetchApartments = async () => {
    const response = await commonApi.get("/apartments"); // Replace with your endpoint
    return response.data;
  };
  const { data: apartments, isLoading } = useQuery({
    queryKey: ["apartment"],
    queryFn: fetchApartments,
  });

  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <h1>This is apartment house</h1>
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {apartments.map((apartment) => (
          <Apartment apartment={apartment} key={apartment._id}></Apartment>
        ))}
      </div>
    </div>
  );
}
