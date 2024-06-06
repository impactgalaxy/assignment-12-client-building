import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import useMemberApartment from "../../../others/hooks/useMemberApartment";
import Loading from "../../components/shared_components/Loading";
import { useState } from "react";

export default function MakePayment() {
  const { myRequest, isLoading } = useMemberApartment();
  const [month, setMonth] = useState("");
  console.log(month);
  if (isLoading) return <Loading></Loading>;
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
        </div>
        <Box className="flex flex-col p-5">
          <FormControl>
            <FormLabel>Payment month</FormLabel>
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
          <Box className="flex-grow"></Box>
          <Flex justifyContent="flex-end">
            <Button colorScheme="blue">Pay</Button>
          </Flex>
        </Box>
      </section>
    </div>
  );
}
