import { formatDistance } from "date-fns";
import useAnnouncement from "../../../others/hooks/useAnnouncement";
import Loading from "../../components/shared_components/Loading";
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function OlderAnnouncement() {
  const { announcements, isLoading, refetch } = useAnnouncement();
  const secureApi = useAxiosSecure();

  if (isLoading) return <Loading></Loading>;
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await secureApi.delete(`/delete-announcement/${id}`);
          if (response.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your announcement has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };
  return (
    <div className="my-14 p-4">
      <Helmet>
        <title>Admin | old announcement</title>
      </Helmet>
      <h1 className="text-2xl">Your announcement</h1>
      <div className="p-4">
        {announcements.map((announce) => (
          <div key={announce._id} className="space-y-4 border p-5 ">
            <h1 className="text-xl font-bold">
              {announce.title} (for {announce.target_audience.role})
            </h1>
            <p>
              {formatDistance(new Date(announce.create_at), new Date(), {
                addSuffix: true,
              })}
            </p>
            <p className="py-4">{announce.message}</p>
            <Button
              colorScheme="orange"
              onClick={() => handleDelete(announce._id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
