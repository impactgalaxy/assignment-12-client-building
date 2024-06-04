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
import { IoIosMenu, IoIosPeople } from "react-icons/io";
import { RiCoupon2Line } from "react-icons/ri";
import useUserCollection from "../../others/hooks/useUserCollection";
import toast from "react-hot-toast";

export default function Dashboard() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { userRole, isLoading } = useUserCollection();
  const [drawer, setDrawer] = useState(false);
  const [block, setBlock] = useState(false);
  const { user, logOut } = useAuth();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, [location?.pathname]);

  if (isLoading) return <Loading></Loading>;

  const style = ({ isActive, isPending, isTransitioning }) => {
    return {
      border: isActive ? "2px solid red" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  };
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
        // navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        let errMsg = error.code.split("/")[1];
        toast.error(errMsg);
      });
  };
  return (
    <section className="flex flex-col lg:flex-row">
      <section
        className={`${
          drawer
            ? "-translate-x-full w-0 transition-all"
            : "transition-all w-full lg:max-w-72"
        } shadow-2xl  lg:h-screen relative p-4 flex flex-col overflow-y-auto`}>
        <div
          className="absolute top-0 right-0 p-2 z-10 cursor-pointer"
          title="Hide side bar">
          <FaArrowLeft
            className="hidden lg:block"
            onClick={() => setDrawer(true)}
          />
          <IoIosMenu
            className="block lg:hidden"
            onClick={() => setBlock(!block)}></IoIosMenu>
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
        <div className={`lg:block ${block ? "block" : "hidden"}`}>
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
            {userRole?.role === "admin" && (
              <div>
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
              </div>
            )}

            {/* Admin nav link end */}

            {/* member nav link start*/}
            {userRole?.role === "member" && (
              <div>
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
              </div>
            )}
            {/* member nav link end */}

            {userRole?.role === "admin" || (
              <NavLink to="announcements" style={style}>
                <Button
                  justifyContent="flex-start"
                  w="100%"
                  height="48px"
                  leftIcon={<TfiAnnouncement />}>
                  Announcements
                </Button>
              </NavLink>
            )}
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
              onClick={handleLogout}
              leftIcon={<VscSignOut />}>
              Logout
            </Button>
          </Box>
        </div>
      </section>
      <div className="flex-1 border min-h-screen relative overflow-x-auto">
        {drawer && (
          <div
            className="absolute top-0 left-50 p-2 z-10 cursor-pointer"
            title="Show side bar">
            <FaArrowRight onClick={() => setDrawer(false)} />
          </div>
        )}

        {load ? <Loading /> : <Outlet></Outlet>}
      </div>
    </section>
  );
}
