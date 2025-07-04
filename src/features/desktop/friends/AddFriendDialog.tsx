import colors from "@/theme/colors";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  VStack,
  Avatar,
  useColorMode,
  useColorModeValue,
  Tag,
} from "@chakra-ui/react";
import { useState } from "react";

const currentUserId = "317468cc-6bed-4352-8a8f-97914aa2c619";

type FriendRequest = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "incoming" | "sent";
};

interface AddFriendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  friendRequests: FriendRequest[];
}

export function AddFriendDialog({ isOpen, onClose, friendRequests }: AddFriendDialogProps) {
  const [search, setSearch] = useState("");
  const { hasCopied, onCopy } = useClipboard(currentUserId);

  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Friend</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Search bar */}
            <Flex mb={4} gap={2}>
              <Input
                placeholder="Enter email or user ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderRadius="md"
                bg="white"
                color="black"
                _placeholder={{ color: "gray.500" }}
                flex="1"
              />
              <Button colorScheme="blue" color={colorMode === "dark" ? "#2B2B2B" : "white"} bg={currentColors.accent.blue} borderRadius="md" px={6} fontWeight="medium">
                Send Invite
              </Button>
            </Flex>

            {/* Friend Requests List */}
            <VStack spacing={3} align="stretch" mb={6}>
              {friendRequests.map((user) => (
                <Flex key={user.id} align="center" justify="space-between" borderRadius="md">
                  <HStack spacing={3}>
                    <Avatar size="sm" name={user.name} src={user.avatar} />
                    <Box>
                      <Text fontWeight="medium">{user.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {user.email}
                      </Text>
                    </Box>
                  </HStack>

                  {/* Right side actions */}
                  {user.status === "incoming" ? (
                    <HStack spacing={2}>
                      <Button size="sm" colorScheme="green" onClick={() => console.log("accept", user.id)}>
                        Accept
                      </Button>
                      <Button size="sm" colorScheme="red" variant="outline" onClick={() => console.log("deny", user.id)}>
                        Deny
                      </Button>
                    </HStack>
                  ) : user.status === "sent" ? (
                    <Text size="sm" variant="link" colorScheme="blue" color={currentColors.accent.blue}>
                      Sent!
                    </Text>
                  ) : null}
                </Flex>
              ))}
            </VStack>

            {/* Your own ID box */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Share Your ID
              </Text>
              <Flex gap={2}>
                <Input isReadOnly value={currentUserId} borderRadius="md" borderColor="gray.300" bg="gray.100" fontSize="sm" color="gray.700" />
                <Button onClick={onCopy} colorScheme="gray" variant="outline" fontWeight="normal" borderRadius="md" minW="90px">
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
