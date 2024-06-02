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
import { Link } from "react-router-dom";

export default function DashHome() {
  const { users, isLoading, totalMember, generalUser, role } =
    useUserCollection();

  if (isLoading) return <Loading></Loading>;

  console.log(role, "admin");

  return (
    <Box bg="base.200" p="15px">
      <Marquee speed={100}>
        <span className="font-bold text-3xl">You are most welcome</span>
      </Marquee>
      <div className="">
        {role && role?.role === "user" && (
          <Card
            align="center"
            bg="linear-gradient(#1F3857, #34495c)"
            color="white">
            <CardHeader>
              <Heading size="md"> This is only for user</Heading>
            </CardHeader>
            <CardBody>
              <Text>There are many link for browser</Text>
            </CardBody>
            <CardFooter>
              <Link to="/" className="btn">
                Back to home
              </Link>
            </CardFooter>
          </Card>
        )}
        {role && role?.role === "member" && (
          <Card
            align="center"
            bg="linear-gradient(#1F3857, #34495c)"
            color="white">
            <CardHeader>
              <Heading size="md"> This is only for member</Heading>
            </CardHeader>
            <CardBody>
              <Text>There are many link for browser</Text>
            </CardBody>
            <CardFooter>
              <Link to="/" className="btn">
                Back to home
              </Link>
            </CardFooter>
          </Card>
        )}
        <div className="flex items-center gap-3 justify-center flex-col md:flex-row flex-wrap">
          {role && role?.role === "admin" && (
            <>
              <Card
                align="center"
                bg="linear-gradient(#1F3857, #34495c)"
                color="white">
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
              <Card
                align="center"
                bg="linear-gradient(#1F3857, #34495c)"
                color="white">
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
              <Card
                align="center"
                bg="linear-gradient(#1F3857, #34495c)"
                color="white">
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
          )}
        </div>
      </div>
    </Box>
  );
}
