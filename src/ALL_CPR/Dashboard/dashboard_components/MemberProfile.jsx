import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import useAuth from "../../../others/hooks/useAuth";
import moment from "moment";

export default function MemberProfile() {
  const { user } = useAuth();
  const secureApi = useAxiosSecure();
  const { data: myRequest = [] } = useQuery({
    queryKey: ["my-request"],
    queryFn: async () => {
      const response = await secureApi(`/agreement-apartment/${user?.uid}`);
      return response.data;
    },
  });
  return (
    <div className="p-5">
      <div className="border-2 py-4 px-2">
        <h1 className="text-2xl md:text-3xl">You apartment details</h1>
        <p className="font-bold text-lg">
          Request{" "}
          <span className="font-black text-2xl">{myRequest.status}</span>
        </p>
        <p>{myRequest?.isAccept ? "Request accept" : ""}</p>
      </div>
      <div className="space-y-5 font-bold text-lg p-4">
        <p>Apartment id : {myRequest.apartment_id}</p>
        <p>Apartment number : {myRequest.apartment_no}</p>
        <p>Block number : {myRequest.block_name}</p>
        <p>Floor number : {myRequest.floor_no}</p>
        <p>Rent per month : ${myRequest.pay}</p>
        <p>
          Request at :
          {moment(new Date(myRequest.request_time)).format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
}
