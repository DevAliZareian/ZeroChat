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
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

// Mock user search result
const foundUsers = [
  { id: "1", name: "Emily Stone", email: "emily.stones@gmail.com", avatar: "" },
  { id: "2", name: "Lucas Bennett", email: "olivertee@gmail.com", avatar: "" },
];

const currentUserId = "317468cc-6bed-4352-8a8f-97914aa2c619";

interface AddFriendDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFriendDialog({ isOpen, onClose }: AddFriendDialogProps) {
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
                placeholder="Type a name, email or User ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderRadius="md"
                bg="white"
                color="black"
                _placeholder={{ color: "gray.500" }}
                flex="1"
              />
              <Button colorScheme="blue" color="white" bg={currentColors.accent.blue} borderRadius="md" px={6} fontWeight="medium">
                Send Invite
              </Button>
            </Flex>

            {/* Found users list */}
            <VStack spacing={3} align="stretch" mb={6}>
              {foundUsers.map((user) => (
                <Flex key={user.id} align="center" justify="space-between" p={2} borderRadius="md">
                  <HStack>
                    <Avatar size="sm" name={user.name} src={user.avatar} />
                    <Box>
                      <Text fontWeight="medium">{user.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {user.email}
                      </Text>
                    </Box>
                  </HStack>
                  <Button size="sm" variant="link" colorScheme="blue" color={currentColors.accent.blue}>
                    Resend
                  </Button>
                </Flex>
              ))}
            </VStack>

            {/* Your own ID box */}
            <Box mt={6}>
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
