import colors from "@/theme/colors";
import { Box, Grid, VStack, Text, Heading, Switch, Divider, Select, useColorModeValue, Flex, Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import Notifications from "./Notifications";
import { useSettingsNav } from "@/store/useSettingsNavigationStore";
import MyProfile from "./MyProfile";
import Security from "./Security";
import DeleteAccountDialog from "../DeleteAccountDialog";

const settingItems = ["My Profile", "Notifications", "Security"] as const;

export default function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { activeSection, setActiveSection } = useSettingsNav();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
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
                {settingItems.map((item, i) => (
                  <Text key={i} fontWeight="medium" color={activeSection === item ? currentColors.accent.blue : currentColors.text.primary} cursor="pointer" onClick={() => setActiveSection(item)}>
                    {item}
                  </Text>
                ))}

                <Text color="#FF5252" fontWeight="semibold" cursor="pointer" onClick={onOpen}>
                  Delete Account
                </Text>
              </VStack>
            </Box>

            {/* === Main Settings Panel === */}
            {activeSection === "My Profile" && <MyProfile />}
            {activeSection === "Notifications" && <Notifications />}
            {activeSection === "Security" && <Security />}
          </Grid>
        </Box>
      </Box>
      <DeleteAccountDialog username="dapshlevi" isOpen={isOpen} onClose={onClose} />
    </>
  );
}
