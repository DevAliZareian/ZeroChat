import colors from "@/theme/colors";
import { Box, Grid, VStack, Text, Heading, Switch, Divider, Select, useColorModeValue, Flex, Button, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

export default function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDark, setIsDark] = useState(colorMode === "dark");

  // Sync Chakra theme when toggle changes
  const handleToggle = () => {
    toggleColorMode();
    setIsDark((prev) => !prev);
  };

  // Keep local state in sync with Chakra
  useEffect(() => {
    setIsDark(colorMode === "dark");
  }, [colorMode]);

  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const cardBg = currentColors.layout.background;
  const borderColor = currentColors.layout.border;
  const textSecondary = currentColors.text.secondary;

  return (
    <Box p={8} bg={useColorModeValue("#e7e7e7", "#1e1e1e")}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="text.primary">
          Settings
        </Heading>

        {/* Top-right component */}
        <DarkModeToggle onChange={handleToggle} checked={isDark} size={80} />
      </Flex>

      <Box bg={cardBg} borderRadius="xl" boxShadow="sm" overflow="hidden">
        <Grid templateColumns="220px 1fr" h="100%">
          {/* === Sidebar === */}
          <Box py={8} px={6} borderRight="1px solid" borderColor={borderColor}>
            <VStack align="start" spacing={5}>
              {["My Profile", "Security", "Teams", "Team Member", "Notifications", "Billing", "Data Export"].map((item, i) => (
                <Text key={i} fontWeight="medium" color={i === 4 ? currentColors.accent.blue : currentColors.text.primary}>
                  {item}
                </Text>
              ))}
              <Text color="red.500" fontWeight="semibold">
                Delete Account
              </Text>
            </VStack>
          </Box>

          {/* === Main Settings Panel === */}
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
              <Button colorScheme="blue" bg={currentColors.accent.blue} color="white" _hover={{ bg: "accent.deactive" }}>
                Save Changes
              </Button>
            </Box>
          </Flex>
        </Grid>
      </Box>
    </Box>
  );
}
