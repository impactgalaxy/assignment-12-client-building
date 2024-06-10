import useAuth from "../../../others/hooks/useAuth";
import defaultUser from "../../../assets/user.png";
import { Flex } from "@chakra-ui/react";
import MemberProfile from "./MemberProfile";
import useAdmin from "../../../others/hooks/useAdmin";
import Admin from "../Admin/Admin";
import useRole from "../../../others/hooks/useRole";
import { Helmet } from "react-helmet-async";
export default function MyProfile() {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const { userRole: role } = useRole();

  return (
    <>
      <Helmet>
        <title>Dashboard | profile</title>
      </Helmet>
      <Flex
        direction="column"
        justifyContent="center"
        gap="10px"
        bg="sienna"
        p="20px">
        <div className="h-28 w-24 m-auto">
          <img
            src={user?.photoURL ? user?.photoURL : defaultUser}
            alt=""
            className="block object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl">{user?.displayName}</h1>
          <h1 className="text-xl md:text-2xl">{user?.email}</h1>
        </div>
        <div className="text-center p-3">
          {role === "member" && <MemberProfile />}
          {isAdmin && <Admin />}
        </div>
      </Flex>
    </>
  );
}
