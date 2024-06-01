import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import useAuth from "../../others/hooks/useAuth";
import defaultUser from "../../assets/user.png";
import Loading from "../components/shared_components/Loading";
import { FaUser } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { VscSignOut } from "react-icons/vsc";
import { FcSettings } from "react-icons/fc";
export default function Dashboard() {
  const [drawer, setDrawer] = useState(false);
  const { user } = useAuth();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setLoad(false);
    };
  }, []);

  return (
    <section className="flex">
      <section
        className={`${
          drawer ? "w-0 transition-all -translate-x-40" : "w-72 transition-all"
        } shadow-2xl border min-h-screen relative p-4 flex flex-col`}>
        <div
          className="absolute top-0 right-5 "
          onClick={() => setDrawer(true)}>
          &lt;
        </div>
        <Flex alignItems="center" gap="10px" border="1px solid black">
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
          <Link to="/dashboard/profile">
            <Button w="100%" height="48px" leftIcon={<FaUser />}>
              My Profile
            </Button>
          </Link>
          <Link to="/dashboard/announcements">
            <Button w="100%" height="48px" leftIcon={<TfiAnnouncement />}>
              Announcements
            </Button>
          </Link>
        </Box>
        <Box>
          <Button w="100%" height="48px" leftIcon={<FcSettings />}>
            Settings
          </Button>
          <Button w="100%" height="48px" leftIcon={<VscSignOut />}>
            Logout
          </Button>
        </Box>
      </section>
      <div className="flex-1 border min-h-screen relative">
        {drawer && (
          <span
            className="absolute top-0 left-50"
            onClick={() => setDrawer(false)}>
            &gt;
          </span>
        )}
        {load ? <Loading /> : <Outlet></Outlet>}
      </div>
    </section>
  );
}
