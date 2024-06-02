import { Box } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";

export default function DashHome() {
  return (
    <Box bg="base.200">
      <Marquee speed={100}>
        <span className="font-bold text-3xl">You are most welcome</span>
      </Marquee>
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <h1 className="text-5xl">This is user landing page</h1>
      </div>
    </Box>
  );
}
