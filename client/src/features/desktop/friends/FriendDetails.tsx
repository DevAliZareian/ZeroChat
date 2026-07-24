// components/FriendDetails.tsx
import {
  Avatar,
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useClipboard,
  useColorMode,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaRegEnvelope } from "react-icons/fa";
import colors from "@/theme/colors";
import { IoMdNotifications } from "react-icons/io";
import { useFriendStore } from "@/store/useFriendStore";
import { useDeleteFriendship } from "@/hooks/friends/useDeleteFriendship";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useFriendsWS } from "@/hooks/friends/useFriendSocket";
import { useConversationsWS } from "@/hooks/chat/useConversationsSocket";
import { useCreateConversation } from "@/hooks/chat/useCreateConversation";

export default function FriendDetails() {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const toast = useToast();
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.user);
  const { selectedFriend, setSelectedFriend } = useFriendStore();
  const { friends } = useFriendsWS();
  const { conversations, isConnected } = useConversationsWS();
  const deleteMutation = useDeleteFriendship();
  const createMutation = useCreateConversation();

  const { hasCopied, onCopy } = useClipboard(String(selectedFriend?.id) || "");

  const friendDetails = friends.find((f) => f.id === selectedFriend?.id);

  if (!selectedFriend) {
    return (
      <Flex
        direction="column"
        w="340px"
        h="100vh"
        borderLeft="1px solid"
        borderColor={currentColors.layout.border}
        bg={currentColors.layout.surface}
        px={4}
        py={6}
        overflowY="auto"
        align="center"
        justify="center"
      >
        <Text color={currentColors.text.secondary}>Select a friend to view details</Text>
      </Flex>
    );
  }

  const handleRemoveFriend = () => {
    deleteMutation.mutate(String(selectedFriend?.id), {
      onSuccess: () => {
        toast({
          title: "Friend removed",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setSelectedFriend(null);
      },
      onError: (err: any) => {
        toast({
          title: "Failed to remove friend",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      },
    });
  };

  const handleChatAction = () => {
    if (!currentUser || !selectedFriend) return;

    let existingConv = null;
    if (isConnected && conversations.length > 0) {
      existingConv = conversations.find((conv) => {
        const userIds = conv.users.map((u: any) => String(u.id || u));
        return userIds.includes(String(currentUser.id)) && userIds.includes(String(selectedFriend.id)) && userIds.length === 2;
      });
    }

    if (existingConv) {
      navigate(`/app/chat/${existingConv.id}`);
    } else {
      createMutation.mutate(
        {
          users: [selectedFriend.id],
          name: selectedFriend.email,
        },
        {
          onSuccess: (data) => {
            toast({
              title: "Conversation created",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate(`/app/chat/${data.id}`);
          },
          onError: (err: any) => {
            toast({
              title: "Failed to start chat",
              description: err.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        },
      );
    }
  };

  const existingConv = (() => {
    if (!isConnected || !conversations.length || !currentUser || !selectedFriend) return null;
    return conversations.find((conv) => {
      const userIds = conv.users.map((u: any) => String(u.id || u));
      return userIds.includes(String(currentUser.id)) && userIds.includes(String(selectedFriend.id)) && userIds.length === 2;
    });
  })();

  const chatButtonText = existingConv ? "Go to Conversation" : "Start a New Chat";
  const isChatLoading = createMutation.isPending;

  return (
    <Flex direction="column" w="340px" h="100vh" borderLeft="1px solid" borderColor={currentColors.layout.border} bg={currentColors.layout.surface} px={4} py={6} overflowY="auto">
      {/* Date & Notification */}
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="sm" color={currentColors.text.secondary}>
          {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        </Text>
        <Box position="relative">
          <IoMdNotifications size={20} color={currentColors.text.secondary} />
          <Circle size="16px" bg={currentColors.accent.blue} color={colorMode === "dark" ? "#2B2B2B" : "white"} fontSize="10px" fontWeight="bold" position="absolute" top="-6px" right="-6px">
            3
          </Circle>
        </Box>
      </Flex>

      {/* Avatar & Info */}
      <VStack spacing={2} mb={6}>
        <Box position="relative">
          <Avatar size="xl" name={friendDetails?.email || selectedFriend.email} border={`1px solid ${currentColors.layout.border}`} />
          <Box position="absolute" bottom="4px" right="10px" bg={currentColors.accent.blue} border={`2px solid ${currentColors.layout.surface}`} boxSize="14px" borderRadius="full" />
        </Box>
        <Text fontWeight="bold" fontSize="lg" color={currentColors.text.primary}>
          {friendDetails?.email || selectedFriend.email}
        </Text>
        <Text fontSize="sm" color={currentColors.text.secondary} textAlign="center" px={4}>
          {/* Bio placeholder */}
        </Text>
      </VStack>

      <Divider mb={4} />

      <Text fontWeight="semibold" fontSize="sm" color={currentColors.text.primary} mb={4}>
        Information
      </Text>

      <VStack spacing={4} align="stretch" mb={8}>
        <Flex align="center" justify="space-between">
          <HStack spacing={3}>
            <Icon as={FaRegEnvelope} color={currentColors.text.secondary} />
            <Text fontSize="sm" color={currentColors.text.secondary}>
              Email
            </Text>
          </HStack>
          <Text fontSize="sm" color={currentColors.text.primary}>
            {selectedFriend.email}
          </Text>
        </Flex>
      </VStack>

      {/* Actions */}
      <Box mt="auto" pt={4}>
        <Flex gap={3}>
          <Popover placement="top" isLazy>
            <PopoverTrigger>
              <Button flex="1" bg="#FF5252" color="black" _hover={{ opacity: 0.9 }} isLoading={deleteMutation.isPending}>
                Remove Friend
              </Button>
            </PopoverTrigger>
            <PopoverContent bg={colorMode === "dark" ? "gray.800" : "white"}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Text fontSize="sm" fontWeight="medium">
                  Are you sure you want to remove this friend?
                </Text>
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end" gap={2}>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
                <Button size="sm" colorScheme="red" onClick={handleRemoveFriend}>
                  Remove
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          <Button onClick={onCopy} flex="1" colorScheme="yellow" bg="#FFEB3B" color="black" _hover={{ opacity: 0.9 }}>
            {hasCopied ? "Copied" : "Copy ID"}
          </Button>
        </Flex>
        <Button width="100%" mt={4} bg={currentColors.accent.blue} color="black" _hover={{ opacity: 0.9 }} onClick={handleChatAction} isLoading={isChatLoading}>
          {chatButtonText}
        </Button>
      </Box>
    </Flex>
  );
}
