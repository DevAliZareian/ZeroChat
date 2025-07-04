import colors from "@/theme/colors";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  Input,
  useDisclosure,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const DeleteAccountDialog = ({ isOpen, onClose, username }: DeleteAccountDialogProps) => {
  const { colorMode } = useColorMode();
  const cancelRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    console.log("Account deleted!");
    onClose();
  };
  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent bg={useColorModeValue("white", "gray.800")} border="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")} borderRadius="lg">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text mb={2}>This action cannot be undone. Please type your username to confirm.</Text>
              <Text fontWeight="semibold" mb={2}>
                Username:{" "}
                <Text as="span" color={currentColors.accent.blue}>
                  {username}
                </Text>
              </Text>
              <Input
                variant={"filled"}
                bg={"transparent"}
                _focus={{
                  borderColor: currentColors.accent.blue,
                }}
                border="1px solid"
                borderColor={currentColors.layout.border}
                _hover={{ bg: "transparent" }}
                mt={2}
                placeholder="Enter your username"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="red" bg="#FF5252" ml={3} isDisabled={inputValue !== username} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAccountDialog;
