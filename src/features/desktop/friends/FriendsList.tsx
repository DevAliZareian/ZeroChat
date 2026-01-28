import colors from "@/theme/colors";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  HStack,
  Avatar,
  IconButton,
  Button,
  useColorModeValue,
  useColorMode,
  Heading,
  Flex,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { BsChat } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AddFriendDialog } from "./AddFriendDialog";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { MdBlock } from "react-icons/md";

const mockFriends = [
  { name: "Dapsh Levi", status: "offline", avatar: "", id: 1 },
  { name: "Diff Seyed", status: "offline", avatar: "", id: 2 },
  { name: "Siza", status: "online", avatar: "", id: 3 },
  { name: "Byco", status: "offline", avatar: "", id: 4 },
];

type FriendRequest = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "pending" | "sent";
};

const friendRequests: FriendRequest[] = [
  {
    id: "1",
    name: "Fardin",
    email: "fardin@gmail.com",
    avatar: "",
    status: "pending",
  },
  {
    id: "2",
    name: "Pixcell",
    email: "Pixcell@gmail.com",
    avatar: "",
    status: "sent",
  },
];

export default function FriendsList() {
  const { colorMode } = useColorMode();
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4} py={5} bg={useColorModeValue("#ffffff", "#1e1e1e")} h="100%" overflowY="auto">
        <Flex mb={4} align="center" justify="space-between">
          <Flex align="center" justify="space-between" gap={3}>
            <Heading size="sm" fontWeight="semibold" color="text.primary">
              Friends
            </Heading>

            {friendRequests.filter((user) => user.status === "pending").length > 0 && (
              <Text fontSize="sm" color={currentColors.accent.blue} cursor="pointer" onClick={onOpen}>
                You have {friendRequests.filter((user) => user.status === "pending").length} new friend request
                {friendRequests.filter((user) => user.status === "pending").length > 1 ? "s" : ""}
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
            <Button size="sm" color={colorMode === "dark" ? "#2B2B2B" : "white"} colorScheme="blue" bg={currentColors.accent.blue} onClick={onOpen}>
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
            variant={"filled"}
            bg={"transparent"}
            _focus={{
              borderColor: currentColors.accent.blue,
            }}
            border="1px solid"
            borderColor={currentColors.layout.border}
            _hover={{ bg: "transparent" }}
          />
        </InputGroup>

        <Text fontSize="sm" mb={2} color={textSecondary}>
          All friends — {mockFriends.length}
        </Text>

        <VStack align="stretch" spacing={2}>
          {mockFriends.map((friend) => (
            <HStack key={friend.id} justify="space-between" py={2} px={0} rounded="md" cursor={"pointer"}>
              <HStack spacing={3}>
                <Avatar name={friend.name} size="sm" />
                <Box>
                  <Text fontSize="sm">{friend.name}</Text>
                  <Text fontSize="xs" color={textSecondary}>
                    {friend.status === "online" ? "Online" : "Offline"}
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
