import { useForm } from "react-hook-form";
import useAuth from "../../../others/hooks/useAuth";
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

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import useUserCollection from "../../../others/hooks/useUserCollection";
import useAxiosCommon from "../../../others/hooks/axios/useAxiosCommon";
import sendMail from "../../../others/helpers/sendMail";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser, googleLogin, loading, setLoading } = useAuth();
  const { users } = useUserCollection();
  const commonApi = useAxiosCommon();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (values) => {
    if (user) {
      Swal.fire({
        title: "You have already Logged in!",
        text: "Please logout first to again login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes logout",
      }).then((result) => {
        if (result.isConfirmed) {
          logOut()
            .then(() => {
              toast.success("Logout successful");
            })
            .error((error) => {
              toast.error(error.code.split("/")[1]);
            });
        }
      });
      return;
    }
    const { email, password } = values;
    try {
      const res = await loginUser(email, password);
      if (res.user.uid) {
        toast.success("Login successful");
        navigate(location?.state ? location?.state : "/");
      }
    } catch (error) {
      let errMsg = error.code.split("/")[1];
      toast.error(errMsg);
    }
  };

  const handleGoogleLogin = async () => {
    if (user) {
      Swal.fire({
        title: "You have already Logged in!",
        text: "Please logout first to again login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes logout",
      }).then((result) => {
        if (result.isConfirmed) {
          logOut()
            .then(() => {
              toast.success("Logout successful");
            })
            .error((error) => {
              toast.error(error.code.split("/")[1]);
            });
        }
      });
      return;
    }
    try {
      const res = await googleLogin();
      if (res.user.uid) {
        const findUser = users.find((user) => user.uid === res.user.uid);
        const userDoc = {
          user_email: res.user.email,
          user_name: res.user?.displayName,
          uid: res.user.uid,
          role: "user",
          registration_time: new Date().toUTCString(),
          user_photo: res.user?.photoURL,
        };
        toast.success("Login successful");
        setLoading(false);
        navigate(location?.state ? location?.state : "/");

        if (findUser) {
          return;
        } else {
          const response = await commonApi.post("/create-users", userDoc);
          if (response.data.insertedId) {
            await sendMail(res.user.email);
          }
        }
      }
    } catch (error) {
      let errMsg = error.code.split("/")[1];
      toast.error(errMsg);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Helmet>
        <title>Build nest | login</title>
      </Helmet>
      <Box
        className="bg-blue-gray-900 md:w-1/2 mx-auto text-white"
        rounded="50px 0 50px 0"
        padding="50px 5px">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="3xl"
          textAlign="center"
          fontWeight="extrabold">
          Login
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
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
                minLength: { value: 6, message: "Minimum length should be 6" },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </div>

        <Flex alignItems="center" justifyContent="space-between" padding="10px">
          <p>
            Do&apos;t have any account?{" "}
            <Link to="/register" className="hover:font-black">
              Register
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
        <Box p="20px 5px" textAlign="center">
          <Button
            onClick={handleGoogleLogin}
            isLoading={loading}
            type="button"
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green.500"
            leftIcon={<FaGoogle />}>
            Google
          </Button>
        </Box>
      </Box>
    </form>
  );
}
