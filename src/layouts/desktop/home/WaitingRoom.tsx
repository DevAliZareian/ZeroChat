import colors from "@/theme/colors";
import { Box, Flex, Image, useColorMode } from "@chakra-ui/react";
import Lottie from "lottie-react";
import Animation from "@/assets/lottie/ChatRoomWaitingAnimation.json";

export default function WaitingRoom() {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  return (
    <Flex direction="column" align="center" justify="center" h="100vh" flex="1" bg={currentColors.layout.background} borderColor={currentColors.layout.border}>
      {/* <Image src="../../../../src/assets/ChatRoomWaitingImg.svg" maxW="560px" w="80%" objectFit="contain" alt="Waiting for conversation" /> */}
      <Box w="260px">
        <Lottie animationData={Animation} loop autoplay />
      </Box>
    </Flex>
  );
}
