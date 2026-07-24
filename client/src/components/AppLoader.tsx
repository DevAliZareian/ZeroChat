import { useEffect, useState } from "react";
import { Center, Fade, VStack, Box, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import AnimationLoader from "@/assets/lottie/AppLoaderAnimation.json";
import { motion } from "framer-motion";

export default function AppLoader() {
  const title = "ZeroChat";
  const letters = title.split("");

  return (
    <Center h="100vh" bg="layout.background">
      <VStack spacing={0}>
        <Box w="260px">
          <Lottie animationData={AnimationLoader} loop autoplay />
        </Box>
        <Box display="flex">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "#5B62B6ff",
                fontFamily: "inherit",
              }}
            >
              {char}
            </motion.span>
          ))}
        </Box>
      </VStack>
    </Center>
  );
}
