import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import { format } from "date-fns";
import moment from "moment";
// import useAuth from "../../../others/hooks/useAuth";
import toast from "react-hot-toast";
import useAgreementRequest from "../../../others/hooks/useAgreementRequest";

export default function AgreementRequest() {
  const secureApi = useAxiosSecure();
  const { newRequest, refetch } = useAgreementRequest();

  const handleAccept = async (
    agreement_id,
    uid,
    status,
    role,
    isAccept,
    apartment_id
  ) => {
    try {
      const response = await secureApi.patch(
        `/agreement-status?agreement_id=${agreement_id}&uid=${uid}&status=${status}&role=${role}&isAccept=${isAccept}&apartment_id=${apartment_id}`
      );
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
          {newRequest.length > 0 && (
            <sup className="rounded-full px-2 bg-green-600">
              {newRequest.length}
            </sup>
          )}
        </h2>
        <div className="overflow-x-auto">
          {newRequest.length === 0 ? (
            <h1 className="text-center md:text-2xl">
              No new request available at this moment
            </h1>
          ) : (
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
                        {moment(new Date(req.request_time)).format(
                          "DD/MM/YYYY"
                        )}
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
                          true,
                          req.apartment_id
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
                          false,
                          req.apartment_id
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
          )}
        </div>
      </div>
    </>
  );
}
