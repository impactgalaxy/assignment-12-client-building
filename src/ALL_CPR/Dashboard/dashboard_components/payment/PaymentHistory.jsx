import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../others/hooks/axios/useAxiosSecure";
import Loading from "../../../components/shared_components/Loading";
import { Card, Typography } from "@material-tailwind/react";
import moment from "moment";
import { useRef, useState } from "react";
import useAuth from "../../../../others/hooks/useAuth";

const TABLE_HEAD = [
  "Month",
  "Payment Date",
  "Amount",
  "Condition",
  "Transactions id",
];
export default function PaymentHistory() {
  const [month, setMonth] = useState("");
  const secureApi = useAxiosSecure();
  const { user, loading } = useAuth();

  const searchVal = useRef();
  const { data: paymentHistory = [], isLoading } = useQuery({
    enabled: !loading,
    queryKey: ["paymentHistory", month],
    queryFn: async () => {
      const history = await secureApi.get(
        `/payment-history?uid=${user?.uid}&month=${month}`
      );
      return history.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  const handleSearch = () => {
    setMonth(searchVal.current.value);
  };
  return (
    <Card className="h-full w-full overflow-scroll py-5">
      <h1>Payment History</h1>
      <div className="flex items-center justify-center py-4 md:space-x-4 bg-blue-gray-500">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="Search"
              className="p-1 focus:outline-none focus:ring">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 dark:text-gray-800">
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            ref={searchVal}
            name="Search"
            placeholder="Search by month name"
            className="w-44 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50"
          />
        </div>
        <button
          onClick={handleSearch}
          type="button"
          className="px-6 py-2 font-semibold rounded text-black">
          Search
        </button>
      </div>
      {paymentHistory.length === 0 ? (
        <h1 className="text-2xl text-center">
          No payment available for {month == "" ? " " : `"${month}"`}
        </h1>
      ) : (
        <table className="w-full min-w-max table-auto text-left border">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map(
              ({ amount, id, month, status, payment_date }, index) => {
                const isLast = index === paymentHistory.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {month}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {moment(new Date(payment_date)).format("DD/MM/YYYY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        ${amount / 100}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {id}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
}
