import { Avatar, AvatarGroup, Box, HStack, Icon, Input, InputGroup, InputLeftElement, Text, VStack, Divider } from "@chakra-ui/react";
import { FiInstagram, FiTwitter, FiSearch, FiGlobe } from "react-icons/fi";

// fake data
const onlineFriends = [
  { id: 1, name: "Dina", avatar: "/avatars/dina.png" },
  { id: 2, name: "Arman", avatar: "/avatars/arman.png" },
  { id: 3, name: "Mehran", avatar: "/avatars/mehran.png" },
  { id: 4, name: "Saba", avatar: "/avatars/saba.png" },
];

const conversations = [
  {
    id: 1,
    name: "Ali Zareian",
    lastMessage: "See you at 8!",
    time: "12:45",
    avatar: "/avatars/ali.png",
    isOnline: true,
  },
  {
    id: 2,
    name: "Karimi",
    lastMessage: "Got the file",
    time: "11:10",
    avatar: "/avatars/karimi.png",
    isOnline: false,
  },
];

export default function Contacts() {
  return (
    <Box w="300px" h="100vh" overflowY="auto" borderRight="1px solid #E2E8F0" p={4} bg="white">
      {/* === USER PROFILE === */}
      <VStack spacing={2} mb={6} position="relative">
        <Box position="relative">
          <Avatar size="xl" name="Bomb Ali" src="/avatars/user.png" />

          {/* Green online dot */}
          <Box position="absolute" bottom="4px" right="10px" boxSize="14px" bg="green.400" border="2px solid white" borderRadius="full" />
        </Box>

        <Text fontWeight="bold">Bomb Ali</Text>

        <HStack spacing={3} color="gray.400">
          <Icon as={FiGlobe} boxSize={4} />
          <Icon as={FiInstagram} boxSize={4} />
          <Icon as={FiTwitter} boxSize={4} />
        </HStack>
      </VStack>

      <Divider mb={4} />

      {/* === FRIENDS ONLINE === */}
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="semibold">
          Friends Online
        </Text>
        <Text fontSize="sm" color="gray.500">
          {onlineFriends.length}
        </Text>
      </HStack>

      <AvatarGroup size="md" max={5} mb={4}>
        {onlineFriends.map((user) => (
          <Avatar key={user.id} name={user.name} src={user.avatar} />
        ))}
      </AvatarGroup>

      {/* === SEARCH BAR === */}
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.400" />
        </InputLeftElement>
        <Input type="text" placeholder="Search..." borderRadius="full" />
      </InputGroup>

      {/* === CHAT LIST === */}
      <VStack spacing={3} align="stretch">
        {conversations.map((chat) => (
          <Box key={chat.id} _hover={{ bg: "gray.100" }} p={2} borderRadius="md" cursor="pointer">
            <HStack spacing={3} align="start">
              {/* Avatar with online dot */}
              <Box position="relative">
                <Avatar size="md" src={chat.avatar} name={chat.name} />

                {/* ✅ Green dot */}
                {chat.isOnline && <Box position="absolute" bottom="2px" right="2px" boxSize="10px" bg="green.400" border="2px solid white" borderRadius="full" />}
              </Box>

              <Box flex="1">
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="sm">
                    {chat.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {chat.time}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.600" isTruncated>
                  {chat.lastMessage}
                </Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
