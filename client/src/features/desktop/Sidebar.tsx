// components/Sidebar.tsx
import { Box, VStack, IconButton, useColorMode, Badge } from "@chakra-ui/react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaMessage } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import colors from "@/theme/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { useFriendRequestsWS } from "@/hooks/friends/useFriendRequestsSocket";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isLogoutDialogOpen: boolean;
  onLogoutDialogOpen: () => void;
}

export default function Sidebar({ isLogoutDialogOpen, onLogoutDialogOpen }: SidebarProps) {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const { friendRequests } = useFriendRequestsWS();
  const pendingCount = friendRequests.filter((req) => req.receiver === currentUser?.email && req.status === "pending").length;

  const activeIconColor = currentColors.accent.blue;
  const inactiveIconColor = currentColors.accent.deactive;

  // Determine active section from current path
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Box w="80px" h="100vh" bg={currentColors.layout.sidebar} borderRight={`1px solid ${currentColors.layout.border}`} display="flex" flexDirection="column" alignItems="center" py={4}>
      <VStack spacing={4} flex={1}>
        <IconButton
          icon={<FaMessage />}
          aria-label="Chat"
          variant="ghost"
          fontSize="24px"
          onClick={() => navigate("/app/chat")}
          color={isActive("/app/chat") || location.pathname === "/app" ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
        <Box position="relative">
          <IconButton
            icon={<HiUserGroup />}
            aria-label="Friends"
            variant="ghost"
            fontSize="24px"
            onClick={() => navigate("/app/friends")}
            color={isActive("/app/friends") ? activeIconColor : inactiveIconColor}
            _hover={{ color: activeIconColor }}
          />
          {pendingCount > 0 && (
            <Badge position="absolute" top="-1" right="-1" colorScheme="blue" borderRadius="full" px={1.5} fontSize="xs">
              {pendingCount}
            </Badge>
          )}
        </Box>
      </VStack>

      <Box mb={2}>
        <IconButton
          icon={<FiSettings />}
          aria-label="Settings"
          variant="ghost"
          fontSize="22px"
          onClick={() => navigate("/app/settings")}
          color={isActive("/app/settings") ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
      </Box>
      <Box>
        <IconButton
          icon={<FiLogOut />}
          aria-label="Logout"
          variant="ghost"
          fontSize="22px"
          onClick={onLogoutDialogOpen}
          color={isLogoutDialogOpen ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
      </Box>
    </Box>
  );
}
