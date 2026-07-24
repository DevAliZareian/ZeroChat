import colors from "@/theme/colors";
import { Box, Button, Divider, Flex, Heading, Select, Switch, Text, useColorMode, VStack } from "@chakra-ui/react";

export default function Notifications() {
  const { colorMode } = useColorMode();

  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const textSecondary = currentColors.text.secondary;
  return (
    <Flex direction="column" py={8} px={10} h="100%">
      <Heading size="md" mb={6} color="text.primary">
        Notifications
      </Heading>

      <VStack spacing={6} align="stretch" flex="1">
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="semibold">Enable Desktop Notification</Text>
            <Text fontSize="sm" color={textSecondary}>
              Receive notification of all the messages, contracts, documents.
            </Text>
          </Box>
          <Switch colorScheme="green" defaultChecked />
        </Flex>

        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="semibold">Enable Unread Notification Badge</Text>
            <Text fontSize="sm" color={textSecondary}>
              Shows a red badge on the app icon when you have unread message
            </Text>
          </Box>
          <Switch colorScheme="blue" defaultChecked />
        </Flex>

        <Box>
          <Text fontWeight="semibold" mb={1}>
            Push Notification Timeout
          </Text>
          <Select placeholder="Select time" defaultValue="10min" maxW="200px">
            <option value="5min">5 Minutes</option>
            <option value="10min">10 Minutes</option>
            <option value="30min">30 Minutes</option>
          </Select>
        </Box>

        <Divider />

        {/* === Email Notifications === */}
        <Box>
          <Text fontWeight="bold" mb={4}>
            Email Notifications
          </Text>

          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Text fontWeight="semibold">Communication Emails</Text>
              <Text fontSize="sm" color={textSecondary}>
                Receive email for messages, contracts, documents.
              </Text>
            </Box>
            <Switch colorScheme="blue" defaultChecked />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="semibold">Announcements & Updates</Text>
              <Text fontSize="sm" color={textSecondary}>
                Receive email about product updates, improvements, etc.
              </Text>
            </Box>
            <Switch colorScheme="blue" />
          </Flex>
        </Box>

        <Divider />

        {/* === Sounds === */}
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold" mb={1}>
              Sounds
            </Text>
            <Text fontSize="sm" color={textSecondary}>
              Mute all notification of the messages, contracts, documents.
            </Text>
          </Box>
          <Switch colorScheme="blue" />
        </Flex>
      </VStack>

      {/* === Save Button === */}
      <Box mt={8} textAlign="right">
        <Button colorScheme="blue" bg={currentColors.accent.blue} color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ bg: "accent.deactive" }}>
          Save Changes
        </Button>
      </Box>
    </Flex>
  );
}
