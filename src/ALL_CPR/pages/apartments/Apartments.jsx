import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../others/hooks/axios/useAxiosCommon";
import Loading from "../../components/shared_components/Loading";
import Apartment from "../../components/apartment/Apartment";
import { useState } from "react";

export default function Apartments() {
  const commonApi = useAxiosCommon();
  const [pageNumber, setPageNumber] = useState(0);

  const fetchApartments = async () => {
    const response = await commonApi.get(
      `/apartments?pageNumber=${pageNumber}`
    ); // Replace with your endpoint
    return response.data;
  };
  const { data: apartments, isLoading } = useQuery({
    queryKey: ["apartment", pageNumber],
    queryFn: fetchApartments,
  });

  const countApartments = async () => {
    const response = await commonApi.get("/apartmentsCount"); // Replace with your endpoint
    return response.data;
  };
  const { data: apartmentsLength, isLoading: countLoader } = useQuery({
    queryKey: ["apartmentsCount"],
    queryFn: countApartments,
  });

  let totalPage = 0;
  if (countLoader) {
    totalPage = 0;
  } else {
    totalPage = Math.ceil(apartmentsLength?.result / 6);
  }
  const navigationButton = [...Array(totalPage).keys()];

  if (isLoading) return <Loading></Loading>;
  return (
    <div>
      <h1>This is apartment house</h1>
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
        {apartments.map((apartment) => (
          <Apartment apartment={apartment} key={apartment._id}></Apartment>
        ))}
      </div>
      <div className="md:w-1/2 mx-auto p-8 text-center">
        <div className="join">
          <button
            className="join-item btn"
            disabled={pageNumber === 0}
            onClick={() => setPageNumber(pageNumber - 1)}>
            «
          </button>
          {navigationButton.map((button, index) => (
            <button
              key={index}
              className={`join-item btn ${
                pageNumber === button ? "bg-pink-100" : ""
              }`}
              onClick={() => setPageNumber(button)}>
              {button}
            </button>
          ))}
          <button
            disabled={pageNumber === navigationButton.length - 1}
            className="join-item btn"
            onClick={() => setPageNumber(pageNumber + 1)}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
