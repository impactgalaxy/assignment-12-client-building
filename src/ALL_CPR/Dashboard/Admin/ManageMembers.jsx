import useUserCollection from "../../../others/hooks/useUserCollection";
import { Card, Typography } from "@material-tailwind/react";
import Loading from "../../components/shared_components/Loading";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const TABLE_HEAD = ["Name", "Email", "Membership Date", "Send Mail", ""];

export default function ManageMembers() {
  const secureApi = useAxiosSecure();
  const { totalMember = [], isLoading, refetch } = useUserCollection();
  if (isLoading) return <Loading></Loading>;

  const handleDeleteMember = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove membership!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await secureApi.patch(
            `http://localhost:5000/delete-member/${id}`,
            {
              role: "user",
            }
          );
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Member deleted successfully",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            setTimeout(() => refetch(), 1700);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };
  // handle send email
  const handleSendMessage = (email) => {
    console.log(email);
  };
  return (
    <Card className="h-full w-full overflow-scroll py-5">
      <h1>Manage members</h1>
      {totalMember.length === 0 ? (
        <h1 className="text-2xl text-center">No member available</h1>
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
            {totalMember.map(
              ({ user_email, user_name, registration_time, _id }, index) => {
                const isLast = index === totalMember.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user_email}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {user_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {user_email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {registration_time}
                      </Typography>
                    </td>
                    <td
                      className={classes}
                      onClick={() => handleSendMessage(user_email)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 cupo cursor-pointer">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </td>
                    <td
                      className={classes}
                      title="Remove membership"
                      onClick={() => handleDeleteMember(_id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-red-500 cursor-pointer">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
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
