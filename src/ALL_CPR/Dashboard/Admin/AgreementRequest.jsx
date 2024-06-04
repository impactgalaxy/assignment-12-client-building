import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import { format } from "date-fns";

export default function AgreementRequest() {
  const secureApi = useAxiosSecure();
  const { data: agreementRequest = [] } = useQuery({
    queryKey: ["agreement-request"],
    queryFn: async () => {
      const response = await secureApi("/agreement-apartment");
      return response.data;
    },
  });
  const newRequest = agreementRequest.filter((newReq) => {
    return newReq.status === "Pending";
  });

  const handleStatus = (id) => {
    console.log(id);
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
                <th className="p-3">Apartment id #</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Request time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {agreementRequest.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                  <td className="p-3">
                    <p>{req.apartment_id}</p>
                  </td>
                  <td className="p-3">
                    <p>{req.contractor_name}</p>
                  </td>
                  <td className="p-3">
                    <p>{req.contractor_email}</p>
                  </td>
                  <td className="p-3">
                    <p> {format(new Date(req.request_time), "dd/mm/yyyy")}</p>
                    <p className="dark:text-gray-600">
                      {format(new Date(req.request_time), "EEEE")}
                    </p>
                  </td>

                  <td className="p-3" onClick={() => handleStatus(req._id)}>
                    <span className="px-3 cursor-pointer py-1 font-semibold rounded-md bg-indigo-500 text-white">
                      <span>{req.status}</span>
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
