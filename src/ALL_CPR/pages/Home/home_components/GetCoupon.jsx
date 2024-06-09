import toast from "react-hot-toast";
import useAuth from "../../../../others/hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../others/hooks/axios/useAxiosCommon";
import useAxiosSecure from "../../../../others/hooks/axios/useAxiosSecure";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useRole from "../../../../others/hooks/useRole";

export default function GetCoupon() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commonApi = useAxiosCommon();
  const secureApi = useAxiosSecure();
  const [myCouponCode, setMyCouponCode] = useState({});
  const [couponLoading, setCouponLoading] = useState(false);
  // const [showCodeBtn, setShowCodeBtn] = useState(false)
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userRole } = useRole();

  const { data: totalCoupon = {} } = useQuery({
    queryKey: ["count-coupon"],
    queryFn: async () => {
      const response = await commonApi.get("/count-coupons");
      return response.data;
    },
  });

  const handleGetCoupon = async () => {
    setCouponLoading(true);
    // setShowCodeBtn(true);

    if (!user) {
      return toast.error("Please login first to pick coupon");
    }

    const generateRandomId = Math.floor(
      Math.random() * totalCoupon.result + 1
    ).toString();
    if (userRole !== "member") {
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
    try {
      const response = await secureApi.get(
        `/getMyCoupon?id=${generateRandomId}&uid=${user.uid}`
      );
      setMyCouponCode(response.data);
      if (response.data) {
        setTimeout(() => {
          setCouponLoading(false);
          onOpen();
          toast.success("Coupon generate successfully");
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className="my-5 p-4">
      <div className="bg-indigo-400 border-4">
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
          {couponLoading && (
            <div className="flex items-center justify-center h-10 p-5">
              <h1 className="text-2xl ">
                Generating coupon code please wait...
              </h1>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your coupon code</ModalHeader>

          <ModalBody>
            <div className="h-20 flex items-center justify-center border-2 my-2">
              <h1 className="text-lg font-bold">{myCouponCode.coupon_code}</h1>
            </div>
            <h1>{myCouponCode.description}</h1>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
