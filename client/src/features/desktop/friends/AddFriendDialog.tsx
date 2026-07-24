import { FriendRequest } from "@/hooks/friends/useFriendRequestsSocket";
import { useSendFriendRequest } from "@/hooks/friends/useSendFriendRequest";
import { useUpdateFriendRequestStatus } from "@/hooks/friends/useUpdateFriendRequestStatus";
import { useAuthStore } from "@/store/useAuthStore";
import colors from "@/theme/colors";
import { isWithinThreeDays } from "@/utils/time";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Avatar,
  useColorMode,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";

interface AddFriendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  friendRequests: FriendRequest[];
}

type MergedRequest = FriendRequest & { type: "incoming" | "outgoing" | "rejected" };

export function AddFriendDialog({ isOpen, onClose, friendRequests }: AddFriendDialogProps) {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id || "";
  const { hasCopied, onCopy } = useClipboard(String(currentUserId));

  const [friendIdentifier, setFriendIdentifier] = useState("");
  const sendMutation = useSendFriendRequest({
    toast,
    onSuccess: () => setFriendIdentifier(""),
  });

  const updateMutation = useUpdateFriendRequestStatus({ toast });

  const handleAddFriend = () => {
    if (!friendIdentifier.trim()) return;
    sendMutation.mutate({ receiver: friendIdentifier.trim() });
  };

  const handleAccept = (requestId: number) => {
    updateMutation.mutate({ requestId, status: "accepted" });
  };

  const handleReject = (requestId: number) => {
    updateMutation.mutate({ requestId, status: "rejected" });
  };

  const mergedRequests = useMemo((): MergedRequest[] => {
    const incoming = friendRequests.filter((req) => req.receiver === currentUser?.email && req.status === "pending").map((req) => ({ ...req, type: "incoming" as const }));

    const outgoing = friendRequests.filter((req) => req.sender === currentUser?.email && req.status === "pending").map((req) => ({ ...req, type: "outgoing" as const }));

    const rejected = friendRequests
      .filter((req) => req.sender === currentUser?.email && req.status === "rejected" && isWithinThreeDays(req.created_at))
      .map((req) => ({ ...req, type: "rejected" as const }));

    return [...incoming, ...outgoing, ...rejected].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [friendRequests, currentUser?.email]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Friend Identifier Input */}
          <Flex mb={4} gap={2}>
            <Input
              placeholder="Enter email or user ID"
              value={friendIdentifier}
              onChange={(e) => setFriendIdentifier(e.target.value)}
              borderRadius="md"
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
              flex="1"
            />
            <Button
              colorScheme="blue"
              bg={currentColors.accent.blue}
              color="white"
              borderRadius="md"
              px={6}
              fontWeight="medium"
              onClick={handleAddFriend}
              isLoading={sendMutation.isPending}
              isDisabled={!friendIdentifier.trim()}
            >
              Send Invite
            </Button>
          </Flex>

          {/* Friend Requests Activity */}
          {mergedRequests.length > 0 ? (
            <VStack spacing={3} align="stretch" mb={4}>
              {mergedRequests.map((req) => (
                <Flex key={req.id} align="center" justify="space-between" borderRadius="md">
                  <HStack spacing={3}>
                    <Avatar size="sm" name={req.type === "incoming" || req.type === "rejected" ? req.sender : req.receiver} />
                    <Box>
                      <Text fontWeight="medium">{req.type === "incoming" || req.type === "rejected" ? req.sender : req.receiver}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {req.type === "incoming" && "Wants to be your friend"}
                        {req.type === "outgoing" && "Request sent"}
                        {req.type === "rejected" && "Request declined"}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack spacing={2}>
                    {req.type === "incoming" && (
                      <>
                        <Button size="sm" colorScheme="green" onClick={() => handleAccept(req.id)} isLoading={updateMutation.isPending}>
                          Accept
                        </Button>
                        <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleReject(req.id)} isLoading={updateMutation.isPending}>
                          Deny
                        </Button>
                      </>
                    )}
                    {req.type === "outgoing" && (
                      <Text fontSize="sm" color={currentColors.accent.blue} fontWeight="medium">
                        Pending
                      </Text>
                    )}
                    {req.type === "rejected" && (
                      <Text fontSize="sm" color="red.400" fontWeight="medium">
                        Rejected
                      </Text>
                    )}
                  </HStack>
                </Flex>
              ))}
            </VStack>
          ) : (
            <Box py={8} textAlign="center">
              <Text color="gray.500">No friend requests yet</Text>
              <Text fontSize="sm" color="gray.400" mt={1}>
                Share your ID or search for friends to get started
              </Text>
            </Box>
          )}

          {/* Share Your ID */}
          <Box mt={4}>
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
  );
}
