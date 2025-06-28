import colors from "@/theme/colors";
import { Box, Flex, Avatar, Text, IconButton, VStack, Grid, GridItem, Divider, useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";

const MyProfile = () => {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const borderColor = currentColors.layout.border;

  return (
    <VStack spacing={6} align="stretch" py={8} px={10}>
      {/* === Basic Info Card === */}
      <Box p={5} borderRadius="xl" border={`1px solid ${borderColor}`}>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={4}>
            <Avatar size="lg" name="Michael Rodriguez" src="/images/avatar.jpg" />
            <Box>
              <Text fontWeight="semibold">Michael Rodriguez</Text>
              <Text fontSize="sm" color="gray.500">
                Product Designer
              </Text>
              <Text fontSize="xs" color="gray.500">
                Los Angeles, California, USA
              </Text>
            </Box>
          </Flex>
          <IconButton icon={<FiEdit2 />} size="sm" variant="ghost" aria-label="Edit profile" />
        </Flex>
      </Box>

      {/* === Personal Info === */}
      <Box p={5} borderRadius="xl" border={`1px solid ${borderColor}`}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontWeight="semibold">Personal information</Text>
          <IconButton icon={<FiEdit2 />} size="sm" variant="ghost" aria-label="Edit personal info" />
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Info label="First Name" value="Michael" />
          <Info label="Last Name" value="Rodriguez" />
          <Info label="Email address" value="rodriguez@gmail.com" />
          <Info label="Phone" value="(213) 555-1234" />
          <GridItem colSpan={2}>
            <Info label="Bio" value="Product Designer" />
          </GridItem>
        </Grid>
      </Box>

      {/* === Address Info === */}
      <Box p={5} borderRadius="xl" border={`1px solid ${borderColor}`}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontWeight="semibold">Address</Text>
          <IconButton icon={<FiEdit2 />} size="sm" variant="ghost" aria-label="Edit address" />
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Info label="Country" value="United States of America" />
          <Info label="City / State" value="California, USA" />
          <Info label="Postal Code" value="ERT 62574" />
          <Info label="TAX ID" value="AS56417896" />
        </Grid>
      </Box>
      {/* === Save Button === */}
      <Box textAlign="right">
        <Button colorScheme="blue" bg={currentColors.accent.blue} color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ bg: "accent.deactive" }}>
          Save Changes
        </Button>
      </Box>
    </VStack>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Text fontSize="xs" color="gray.500" mb={1}>
      {label}
    </Text>
    <Text fontWeight="medium" fontSize="sm">
      {value}
    </Text>
  </Box>
);

export default MyProfile;
