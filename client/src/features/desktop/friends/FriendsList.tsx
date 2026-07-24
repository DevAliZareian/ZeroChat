import {
  useColorMode,
  useColorModeValue,
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { BsChat } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import colors from "@/theme/colors"; // adjust import as needed
import { useFriendsWS } from "@/hooks/friends/useFriendSocket";
import { useFriendRequestsWS } from "@/hooks/friends/useFriendRequestsSocket";
import { AddFriendDialog } from "./AddFriendDialog";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { useAuthStore } from "@/store/useAuthStore";
import { useFriendStore } from "@/store/useFriendStore";

export default function FriendsList() {
  const { colorMode } = useColorMode();
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const user = useAuthStore((state) => state.user);
  const { selectedFriend, setSelectedFriend } = useFriendStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { friends } = useFriendsWS();
  const { friendRequests } = useFriendRequestsWS();

  const pendingCount = friendRequests.filter((req) => req.receiver === user?.email && req.status === "pending").length;

  return (
    <>
      <Box px={4} py={5} bg={useColorModeValue("#ffffff", "#1e1e1e")} h="100%" overflowY="auto" w="100%">
        <Flex mb={4} align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Heading size="sm" fontWeight="semibold" color="text.primary">
              Friends
            </Heading>
            {pendingCount > 0 && (
              <Text fontSize="sm" color={currentColors.accent.blue} cursor="pointer" onClick={onOpen}>
                {pendingCount} new friend request{pendingCount > 1 ? "s" : ""}
              </Text>
            )}
          </Flex>
          <HStack spacing={2}>
            <Button size="sm" variant="ghost">
              Online
            </Button>
            <Button size="sm" variant="ghost">
              All
            </Button>
            <Button size="sm" colorScheme="blue" bg={currentColors.accent.blue} onClick={onOpen}>
              Add Friend
            </Button>
          </HStack>
        </Flex>

        <InputGroup mb={5}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color={textSecondary} />
          </InputLeftElement>
          <Input
            placeholder="Search"
            variant="filled"
            bg="transparent"
            _focus={{ borderColor: currentColors.accent.blue }}
            border="1px solid"
            borderColor={currentColors.layout.border}
            _hover={{ bg: "transparent" }}
          />
        </InputGroup>

        <Text fontSize="sm" mb={2} color={textSecondary}>
          All friends — {friends.length}
        </Text>

        <VStack align="stretch" spacing={2}>
          {friends.map((friend) => (
            <HStack key={friend.id} justify="space-between" py={2} px={0} rounded="md" cursor="pointer" onClick={() => setSelectedFriend(friend)}>
              <HStack spacing={3}>
                <Avatar name={friend.email} size="sm" />
                <Box>
                  <Text fontSize="sm">{friend.email}</Text>
                  <Text fontSize="xs" color={textSecondary}>
                    Offline
                  </Text>
                </Box>
              </HStack>
              <HStack>
                <IconButton size="sm" icon={<BsChat />} aria-label="Chat" variant="ghost" />
                <Popover placement="left-start" isLazy>
                  <PopoverTrigger>
                    <IconButton size="sm" icon={<HiOutlineDotsVertical />} aria-label="More" variant="ghost" />
                  </PopoverTrigger>
                  <PopoverContent w="150px">
                    <PopoverArrow />
                    <PopoverBody>
                      <VStack align="stretch" spacing={1}>
                        <Button variant="ghost" size="sm" justifyContent="flex-start" leftIcon={<HiOutlineSpeakerXMark size={16} />}>
                          Mute
                        </Button>
                        <Button variant="ghost" size="sm" justifyContent="flex-start" leftIcon={<MdBlock size={16} />}>
                          Block
                        </Button>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
      <AddFriendDialog isOpen={isOpen} onClose={onClose} friendRequests={friendRequests} />
    </>
  );
}
