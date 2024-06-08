import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import useMemberApartment from "../../../others/hooks/useMemberApartment";
import Loading from "../../components/shared_components/Loading";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../../others/hooks/useAuth";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function MakePayment() {
  const secureApi = useAxiosSecure();
  let coupon_code = useRef();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { myRequest, isLoading } = useMemberApartment();
  const [month, setMonth] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [payablePrice, setPayablePrice] = useState(0);

  if (isLoading) return <Loading></Loading>;

  const handlePay = async () => {
    if (!month) {
      return toast.error("Please select month");
    }
    try {
      const paymentIntent = await secureApi.post("/create-payment-intent", {
        coupon_code: coupon_code.current.value,
        price: myRequest.pay,
      });
      setClientSecret(paymentIntent.data.clientSecret);
      setPayablePrice(paymentIntent.data.payablePrice);
    } catch (error) {
      toast.error(error.message);
    }
    onOpen();
  };
  return (
    <div className="p-4 lg:p-10">
      <h1 className="text-2xl lg:3xl">Pay your payment </h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-x border-t">
        <div className="p-5 ">
          <Box border="1px solid black" className="grid grid-cols-2 ">
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              Apartment no
            </h1>
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              {myRequest.apartment_no}
            </h1>
          </Box>
          <Box border="1px solid black" className="grid grid-cols-2 ">
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              Block no
            </h1>
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              {myRequest.block_name}
            </h1>
          </Box>
          <Box border="1px solid black" className="grid grid-cols-2 ">
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              Floor no
            </h1>
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              {myRequest.floor_no}
            </h1>
          </Box>
          <Box border="1px solid black" className="grid grid-cols-2 ">
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              Rent per month
            </h1>
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              ${myRequest.pay}
            </h1>
          </Box>
          <Box border="1px solid black" className="grid grid-cols-2 ">
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              Leaseholder name
            </h1>
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              {user?.displayName}
            </h1>
          </Box>
          <Box border="1px solid black" className="grid grid-cols-2 ">
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              Leaseholder email
            </h1>
            <h1 className="bg-blue-gray-300 py-3 text-center select-none">
              {user?.email}
            </h1>
          </Box>
        </div>
        <Box className="flex flex-col p-5 gap-3">
          <FormControl>
            <FormLabel>Payment</FormLabel>
            <Select
              placeholder="Select month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Select>
          </FormControl>

          <Box className="flex-grow">
            <FormControl>
              <FormLabel>Apply coupon code</FormLabel>
              <Input
                htmlSize={4}
                width="220px"
                ref={coupon_code}
                placeholder="Apply coupon if any"
              />
            </FormControl>
          </Box>
          <Flex justifyContent="flex-end">
            <Button colorScheme="blue" onClick={handlePay}>
              Pay
            </Button>
          </Flex>
        </Box>
      </section>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p="20px 0" className="space-y-2">
              <h1>
                Your payment of <span className="font-black ">{month}</span>{" "}
                month
              </h1>
              <h1>
                Net payable{" "}
                <span className="font-black ">{payablePrice / 100}</span>
              </h1>
              {myRequest.pay === payablePrice / 100 ? (
                <p className="text-red-600 text-lg">Sorry! invalid coupon</p>
              ) : (
                <h1>
                  Congratulations! you got{" "}
                  <span className="font-black ">
                    {myRequest.pay - payablePrice / 100} discount
                  </span>
                </h1>
              )}
            </Box>
            <Box className="py-5">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  month={month}
                  payable={myRequest.pay}
                  clientSecret={clientSecret}
                  onClose={onClose}
                />
              </Elements>
            </Box>
          </ModalBody>
        </ModalContent>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}
