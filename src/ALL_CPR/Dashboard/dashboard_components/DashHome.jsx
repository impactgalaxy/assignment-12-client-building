import Marquee from "react-fast-marquee";
import useAdmin from "../../../others/hooks/useAdmin";
import { Box } from "@chakra-ui/react";

export default function DashHome() {
  const { isAdmin } = useAdmin();

  // if (isLoading) return <Loading></Loading>;

  return (
    <Box bg="base.200" p="15px">
      <Marquee speed={100}>
        <span className="font-bold text-3xl">You are most welcome</span>
      </Marquee>
      <div className="">
        <div className="flex items-center gap-3 justify-center flex-col md:flex-row flex-wrap">
          {isAdmin ? (
            <>
              <h1>Admin component</h1>
            </>
          ) : (
            <div className="p-10 flex items-center justify-center">
              <h1 className="lg:text-8xl text-2xl md:text-4xl">
                Get fancy discount{" "}
              </h1>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}
