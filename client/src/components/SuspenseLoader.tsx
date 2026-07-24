import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export default function InitialLoader() {
  return (
    <Center h="100vh" w="100vw" bg="gray.50">
      <VStack spacing={3}>
        <Spinner size="xl" color="blue.500" />
      </VStack>
    </Center>
  );
}
