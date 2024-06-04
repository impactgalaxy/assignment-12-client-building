import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MakeAnnouncement() {
  const [value, setValue] = useState("1");
  const secureApi = useAxiosSecure();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAnnouncement = async (values) => {
    values.create_at = new Date().toUTCString();
    values.target_audience = {
      role: value == "1" ? "All" : value == "2" ? "Members" : "Users",
    };
    try {
      const response = await secureApi.post("/announcements", values);
      if (response.data.insertedId) {
        toast.success("Announcement created successfully");
        setTimeout(() => onClose(), 3000);
        reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="lg:w-1/2 mx-auto py-10 text-center">
        <h1>Make new message to member and user</h1>
        <div className="p-10 flex items-center justify-between">
          <Link to="/dashboard/older-announcement">See older </Link>
          <Button onClick={onOpen}>Make new</Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make new announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleAnnouncement)}>
              <FormControl>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row">
                    <Radio value="1">All</Radio>
                    <Radio value="2">Only members</Radio>
                    <Radio value="3">Only users</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl className="mt-4">
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  {...register("message")}
                  placeholder="Here admin message"
                />
              </FormControl>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}>
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}