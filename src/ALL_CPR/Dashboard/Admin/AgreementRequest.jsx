import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import { format } from "date-fns";
import moment from "moment";
// import useAuth from "../../../others/hooks/useAuth";
import toast from "react-hot-toast";

export default function AgreementRequest() {
  const secureApi = useAxiosSecure();

  const { data: agreementRequest = [], refetch } = useQuery({
    queryKey: ["agreement-request"],
    queryFn: async () => {
      const response = await secureApi("/agreement-apartment");
      return response.data;
    },
  });
  console.log(agreementRequest);
  const newRequest = agreementRequest.filter((newReq) => {
    return newReq.status === "Pending";
  });

  const handleAccept = async (agreement_id, uid, status, role, isAccept) => {
    console.log(
      "agreementId",
      agreement_id,
      "uid",
      uid,
      status,
      role,
      isAccept
    );
    try {
      const response = await secureApi.patch(
        `/agreement-status?agreement_id=${agreement_id}&uid=${uid}&status=${status}&role=${role}&isAccept=${isAccept}`
      );
      console.log(response.data);
      if (response.data.deletedCount > 0) {
        toast.success("Request delete");
        refetch();
        return;
      }
      if (
        response.data.result.modifiedCount > 0 ||
        response.data.result2.modifiedCount > 0
      ) {
        toast.success("Request accept");
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          New Request{" "}
          <sup className="rounded-full px-2 bg-green-600">
            {newRequest.length}
          </sup>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Apartment no</th>
                <th className="p-3">Floor no</th>
                <th className="p-3">Block no</th>
                <th className="p-3">Rent</th>

                <th className="p-3">Request time</th>
              </tr>
            </thead>
            <tbody>
              {newRequest.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                  <td className="p-3">
                    <p>{req.contractor_name}</p>
                  </td>
                  <td className="p-3">
                    <p>{req.contractor_email}</p>
                  </td>
                  <td className="p-3 text-center">
                    <p>{req.apartment_no}</p>
                  </td>
                  <td className="p-3 text-center">
                    <p>{req.floor_no}</p>
                  </td>
                  <td className="p-3 text-center">
                    <p>{req.block_name}</p>
                  </td>
                  <td className="p-3">
                    <p>${req.pay}</p>
                  </td>

                  <td className="p-3">
                    <p>
                      {" "}
                      {moment(new Date(req.request_time)).format("DD/MM/YYYY")}
                    </p>
                    <p className="dark:text-gray-600">
                      {format(new Date(req.request_time), "EEEE")}
                    </p>
                  </td>

                  <td
                    className="p-3"
                    onClick={() =>
                      handleAccept(
                        req._id,
                        req.contractor_uid,
                        "Checked",
                        "member",
                        true
                      )
                    }>
                    <span className="px-3 cursor-pointer py-1 font-semibold rounded-md bg-indigo-500 text-white">
                      <span>Accept</span>
                    </span>
                  </td>
                  <td
                    className="p-3"
                    onClick={() =>
                      handleAccept(
                        req._id,
                        req.contractor_uid,
                        "Checked",
                        "user",
                        false
                      )
                    }>
                    <span className="px-3 cursor-pointer py-1 font-semibold rounded-md bg-red-300 text-white">
                      <span>Reject</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
