import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import useUserCollection from "../../../others/hooks/useUserCollection";
import Loading from "../../components/shared_components/Loading";
import useAuth from "../../../others/hooks/useAuth";

export default function DashHome() {
  const { user } = useAuth();
  const { users, isLoading } = useUserCollection();

  const totalMember = users.filter((member) => member.role === "member");
  const generalUser = users.filter((member) => member.role === "user");
  const admin = users.find((admin) => admin.uid === user?.uid);
  console.log(admin);

  if (isLoading) return <Loading></Loading>;
  return (
    <Box bg="base.200" p="15px">
      <Marquee speed={100}>
        <span className="font-bold text-3xl">You are most welcome</span>
      </Marquee>
      <div className="">
        <h1 className="text-center text-2xl lg:text-5xl">
          This is for only general user landing page
        </h1>
        <div className="flex items-center gap-3 justify-center flex-col md:flex-row flex-wrap">
          {
            <>
              <Card align="center">
                <CardHeader>
                  <Heading size="md"> Total User</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    View a summary of all your customers over the last month.
                  </Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="blue">{users.length}</Button>
                </CardFooter>
              </Card>
              <Card align="center">
                <CardHeader>
                  <Heading size="md"> Total Member</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    View a summary of all your customers over the last month.
                  </Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="blue">
                    {totalMember.length > 0
                      ? totalMember.length
                      : "No member yet"}
                  </Button>
                </CardFooter>
              </Card>
              <Card align="center">
                <CardHeader>
                  <Heading size="md"> Total general User</Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    View a summary of all your customers over the last month.
                  </Text>
                </CardBody>
                <CardFooter>
                  <Button colorScheme="blue">{generalUser.length}</Button>
                </CardFooter>
              </Card>
            </>
          }
        </div>
      </div>
    </Box>
  );
}
