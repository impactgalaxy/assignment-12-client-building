import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Register() {
  // const { createUser } = useAuth();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    const { email, password, captcha } = values;
    const isValid = validateCaptcha(captcha);
    console.log(values, isValid);
    if (!isValid) return toast.error("Please validate captcha");
    console.log(values, isValid);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        className="bg-blue-gray-900 md:w-1/2 mx-auto text-white"
        rounded="50px 0 50px 0"
        padding="20px 5px">
        <Text align="center" padding="15px" fontSize="25px" fontWeight="900">
          Register
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="photo">Choose Photo</FormLabel>
            <fieldset className="w-full space-y-1 dark:text-gray-800">
              <div className="flex">
                <input
                  type="file"
                  name="files"
                  id="files"
                  className="p-1 border-2 rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"
                  {...register("files")}
                />
              </div>
            </fieldset>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </div>
        <Box className="flex flex-col gap-5 items-center justify-center p-10">
          <div className="border">
            <LoadCanvasTemplateNoReload />
          </div>
          <input
            className="input input-bordered text-black"
            type="text"
            {...register("captcha")}
            placeholder="Enter captcha"
          />
        </Box>
        <Flex alignItems="center" justifyContent="space-between" padding="10px">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="hover:font-black">
              Login
            </Link>
          </p>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit">
            Login
          </Button>
        </Flex>
      </Box>
    </form>
  );
}