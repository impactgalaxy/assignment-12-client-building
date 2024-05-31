import { Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="h-40 flex items-center justify-center">
      <Box
        w="50px"
        h="50px"
        bgGradient="repeating-conic-gradient(blue 5%, #FFA000 10%)"
        className="spin"
        borderRadius="50%"
        zIndex="10"
      />
    </div>
  );
}
