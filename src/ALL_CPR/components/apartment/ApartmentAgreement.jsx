import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../../others/hooks/axios/useAxiosCommon";
import useAuth from "../../../others/hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import sendMail from "../../../others/helpers/sendMail";

export default function ApartmentAgreement() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const commonApi = useAxiosCommon();

  useEffect(() => {
    setTimeout(() => onOpen(), 2500);
  }, []);
  const fetchAgreementData = async () => {
    const response = await commonApi.get(`/apartment/${id}`);
    return response.data;
  };

  const { data: agreement = [] } = useQuery({
    queryKey: ["agreement"],
    queryFn: fetchAgreementData,
  });
  const {
    title,
    image,
    floor_no,
    block_name,
    apartment_no,
    rent,
    description,
    _id,
  } = agreement || {};

  const handleAgreement = async () => {
    setLoading(true);
    const agreementInfo = {
      contractor_name: user?.displayName,
      contractor_email: user?.email,
      contractor_uid: user?.uid,
      block_name,
      floor_no,
      apartment_no,
      pay: rent,
      request_time: new Date().toUTCString(),
      status: "Pending",
      apartment_id: _id,
    };

    try {
      const response = await commonApi.post(
        `/agreement-apartment?uid=${user?.uid}`,
        agreementInfo
      );
      if (response.data.message) {
        setLoading(false);
        onClose();
        return toast.error(response.data.message);
      }
      if (response.data.insertedId) {
        setLoading(false);
        onClose();
        Swal.fire({
          title: "Congratulations! Agreement success",
          text: "Please wait for owner response and check your email for further information.",
          showConfirmButton: true,
        });
        await sendMail(user?.email);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      onClose();
    }
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <div
        onClick={onOpen}
        className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src={image}
            alt=""
            className="w-full h-60 sm:h-96 dark:bg-gray-500"
            title="Click to proceed"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-700 text-white">
            <div className="space-y-2">
              <p className="inline-block text-2xl font-semibold sm:text-3xl">
                {description}
              </p>
              <p className="text-sm text-gray-900">
                {title}
                {" Block=> "}
                {block_name}
                {", Apartment number=> "}
                {apartment_no}
                {", Floor=> "}
                {floor_no}
                {", Rent=> "}
                {apartment_no}
                {" per month"}
              </p>
            </div>
            <div className="dark:text-gray-800">
              <Link to="/apartments" className="btn btn-outline">
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview your apartment</ModalHeader>

          <ModalBody pb={6}>
            <div className="space-y-4 py-2">
              <Flex alignItems="center" justifyContent="space-between">
                <h1 className="text-xl">
                  Apartment no:{" "}
                  <span className="font-bold">{apartment_no}</span>
                </h1>
                <h1 className="text-xl">
                  Block: <span className="font-bold">{block_name}</span>
                </h1>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <h1 className="text-xl">
                  Floor: <span className="font-bold">{floor_no}</span>
                </h1>
                <h1 className="text-xl">
                  Rent:{" "}
                  <span className="font-bold bg-orange-300 p-1 rounded-md">
                    ${rent}/month
                  </span>
                </h1>
              </Flex>
              <Box className="py-4">
                <h1 className="text-xs font-bold">Description</h1>
                <h1>{description}</h1>
              </Box>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              colorScheme="blue"
              mr={3}
              onClick={handleAgreement}>
              Proceed
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
