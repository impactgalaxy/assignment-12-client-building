import { formatDistance } from "date-fns";
import useAnnouncement from "../../../others/hooks/useAnnouncement";
import Loading from "../../components/shared_components/Loading";
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import toast from "react-hot-toast";

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
    <div className=" flex items-center justify-center mx-auto my-14">
      <div className="p-4">
        {announcements.map((announce) => (
          <div key={announce._id} className="space-y-4 border p-4 ">
            <h1 className="text-xl font-bold">{announce.title}</h1>
            <p>
              {formatDistance(new Date(announce.create_at), new Date(), {
                addSuffix: true,
              })}
            </p>
            <p>{announce.message}</p>
            <Button onClick={() => handleDelete(announce._id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
