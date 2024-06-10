import toast from "react-hot-toast";
import useAuth from "../../../../others/hooks/useAuth";
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

export default function GetCoupon() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commonApi = useAxiosCommon();
  const secureApi = useAxiosSecure();
  const [myCouponCode, setMyCouponCode] = useState({});
  const [couponLoading, setCouponLoading] = useState(false);
  // const [showCodeBtn, setShowCodeBtn] = useState(false)
  const { user } = useAuth();

  const { data: totalCoupon = {} } = useQuery({
    queryKey: ["count-coupon"],
    queryFn: async () => {
      const response = await commonApi.get("/count-coupons");
      return response.data;
    },
  });

  const handleGetCoupon = async () => {
    if (!user) {
      return toast.error("Please login first to pick coupon");
    }

    setCouponLoading(true);
    const generateRandomId = Math.floor(
      Math.random() * totalCoupon.result + 1
    ).toString();
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
              disabled={couponLoading}
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
            <div className="flex items-center justify-center gap-1 p-5">
              <h1 className="text-sm md:text-2xl ">
                Generating coupon code please wait
              </h1>
              <div className="flex items-end justify-center space-x-2 h-5">
                <div className="w-2 h-2 rounded-full animate-pulse bg-indigo-900"></div>
                <div className="w-2 h-2 rounded-full animate-pulse bg-indigo-900"></div>
                <div className="w-2 h-2 rounded-full animate-pulse bg-indigo-900"></div>
              </div>
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
