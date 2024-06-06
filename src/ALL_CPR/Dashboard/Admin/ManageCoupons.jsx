import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ManageCoupons() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const secureApi = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await secureApi.get("/coupons");
      return response.data;
    },
  });
  const handleAddCoupon = async (values) => {
    const { coupon, discount, description } = values;
    const coupon_code = coupon.split(" ").join("");
    const id = (coupons.length + 1).toString();
    try {
      const response = await secureApi.post("/create-coupons", {
        coupon_code,
        discount,
        description,
        id,
      });
      if (response.data.insertedId) {
        toast.success("Coupon added successfully");
        reset();
        refetch();
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-5">
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Sl</Th>
              <Th>Coupon code</Th>
              <Th>Discount offer</Th>
              <Th>description</Th>
              <Th>
                <Button colorScheme="blue" onClick={onOpen}>
                  Add coupon
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {coupons.map((coupon, index) => (
              <Tr key={coupon._id}>
                <Td>{index + 1}</Td>
                <Td>{coupon.coupon_code}</Td>
                <Td>{coupon.discount}</Td>
                <Td title={coupon.description}>
                  {coupon.description.slice(0, 20).concat("...")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your coupon</ModalHeader>

          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(handleAddCoupon)}>
              <FormControl>
                <FormLabel>Enter coupon code</FormLabel>
                <Input
                  {...register("coupon")}
                  required
                  placeholder="Enter coupon code"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Enter discount</FormLabel>
                <Input
                  placeholder="Enter discount"
                  {...register("discount")}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Enter description</FormLabel>
                <Input
                  placeholder="Enter description"
                  {...register("description")}
                />
              </FormControl>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  mr={3}
                  type="submit">
                  Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
