import toast from "react-hot-toast";
import useAuth from "../../../../others/hooks/useAuth";
import useUserCollection from "../../../../others/hooks/useUserCollection";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function GetCoupon() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { users } = useUserCollection();
  const isMember = users.find((user) => user.uid === user?.uid);
  const handleGetCoupon = () => {
    if (!user) {
      return toast.error("Please login first to pick coupon");
    }
    if (isMember.role !== "member") {
      return Swal.fire({
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        title: "Not for user",
        text: "To get coupon become member first",
        confirmButtonText: "Get, membership!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/apartments");
        }
      });
    }
    console.log("get c");
  };
  return (
    <section className="my-5 p-4">
      <div className="bg-indigo-400">
        <div className="container flex flex-col items-center px-4 py-16  mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-50">
            GET ULTIMATE COUPON CODE
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-50">
            Please pick your choice and get ultimate discount by your coupon!
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button
              type="button"
              className=" btn btn-accent"
              onClick={handleGetCoupon}>
              Get Coupon
            </button>
            <button type="button" className="btn-outline btn">
              Condition
            </button>
          </div>
        </div>
      </div>
      <img
        src="https://source.unsplash.com/random/480x320"
        alt=""
        className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40"
      />
    </section>
  );
}
