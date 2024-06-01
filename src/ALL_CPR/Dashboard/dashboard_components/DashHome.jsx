import { Box } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";

export default function DashHome() {
  return (
    <Box bg="base.200">
      <Marquee speed={100}>
        <span className="font-bold text-3xl">You are most welcome</span>
      </Marquee>
    </Box>
  );
}
