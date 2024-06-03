import { Box, Flex, Text } from "@chakra-ui/react";
import useAnnouncement from "../../../others/hooks/useAnnouncement";
import Loading from "../../components/shared_components/Loading";
import { formatDistance } from "date-fns";

export default function Announcements() {
  const { announcements, isLoading } = useAnnouncement();
  if (isLoading) return <Loading></Loading>;
  console.log(announcements);
  return (
    <div className="space-y-5 p-5">
      {announcements.map((announce) => (
        <Box
          key={announce._id}
          className="lg:w-3/4 mx-auto text-white p-4"
          bg="linear-gradient(#1F3857, #34495c)">
          <Flex justifyContent="space-between">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="xl"
              textAlign="center"
              fontWeight="bold">
              {`${announce.title} (for ${announce?.target_audience?.role}) `}
            </Text>
            <Text>
              {formatDistance(new Date(announce.create_at), new Date(), {
                addSuffix: true,
              })}
            </Text>
          </Flex>
          <Box className="py-6 px-2">{announce.message}</Box>
        </Box>
      ))}
    </div>
  );
}
