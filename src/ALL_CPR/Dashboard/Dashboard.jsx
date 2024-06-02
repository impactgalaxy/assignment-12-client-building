import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import useAuth from "../../others/hooks/useAuth";
import defaultUser from "../../assets/user.png";
import Loading from "../components/shared_components/Loading";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHistory,
  FaRegQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { VscSignOut } from "react-icons/vsc";
import { FcSettings } from "react-icons/fc";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { RiCoupon2Line } from "react-icons/ri";

export default function Dashboard() {
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);
  const { user } = useAuth();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, [location?.pathname]);
  const style = ({ isActive, isPending, isTransitioning }) => {
    return {
      border: isActive ? "2px solid red" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  };
  return (
    <section className="flex">
      <section
        className={`${
          drawer ? "w-0 transition-all -translate-x-40" : "w-72 transition-all"
        } shadow-2xl border max-h-screen relative p-4 flex flex-col overflow-y-auto`}>
        <div
          className="absolute top-0 right-0 p-2 z-10 cursor-pointer"
          title="Show side bar">
          <FaArrowLeft onClick={() => setDrawer(true)} />
        </div>
        <Flex alignItems="center" gap="10px">
          <img src={logo} alt="" className="h-10 w-10 object-cover" />
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
            textAlign="center"
            fontWeight="extrabold">
            Build Nest
          </Text>
        </Flex>
        <Flex alignItems="center" gap="10px">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={user?.photoURL ? user?.photoURL : defaultUser}
          />
          <Text fontWeight="bold">{user?.displayName}</Text>
        </Flex>
        <Box className="flex-grow border">
          <NavLink to="my-profile" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              className="text-red-700"
              leftIcon={<FaUser />}>
              My Profile
            </Button>
          </NavLink>
          {/* Admin nav link start*/}
          <NavLink to="manage-members" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              className="text-red-700"
              leftIcon={<IoIosPeople />}>
              Manage Members
            </Button>
          </NavLink>
          <NavLink to="make-announcement" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              className="text-red-700"
              leftIcon={<TfiAnnouncement />}>
              Make Announcement
            </Button>
          </NavLink>
          <NavLink to="agreement-request" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              className="text-red-700"
              leftIcon={<FaRegQuestionCircle />}>
              Agreement Request
            </Button>
          </NavLink>
          <NavLink to="manage-coupons" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              className="text-red-700"
              leftIcon={<RiCoupon2Line />}>
              Manage Coupons
            </Button>
          </NavLink>

          {/* Admin nav link end */}

          {/* member nav link start*/}
          <NavLink to="make-payment" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              leftIcon={<RiSecurePaymentFill />}>
              Make Payment
            </Button>
          </NavLink>
          <NavLink to="payment-history" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              leftIcon={<FaHistory />}>
              Payment History
            </Button>
          </NavLink>
          {/* member nav link end */}

          <NavLink to="announcements" style={style}>
            <Button
              justifyContent="flex-start"
              w="100%"
              height="48px"
              leftIcon={<TfiAnnouncement />}>
              Announcements
            </Button>
          </NavLink>
        </Box>
        <Box>
          <Button
            justifyContent="flex-start"
            w="100%"
            height="48px"
            leftIcon={<FcSettings />}>
            Settings
          </Button>
          <Button
            justifyContent="flex-start"
            w="100%"
            height="48px"
            leftIcon={<VscSignOut />}>
            Logout
          </Button>
        </Box>
      </section>
      <div className="flex-1 border min-h-screen relative">
        {drawer && (
          <div
            className="absolute top-0 left-50 p-2 z-10 cursor-pointer"
            title="Hide side bar">
            <FaArrowRight onClick={() => setDrawer(false)} />
          </div>
        )}

        {load ? <Loading /> : <Outlet></Outlet>}
      </div>
    </section>
  );
}
