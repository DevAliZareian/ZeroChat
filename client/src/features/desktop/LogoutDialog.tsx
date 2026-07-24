import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useDisclosure, useColorModeValue, Text, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { FiLogOut } from "react-icons/fi";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutDialog({ isOpen, onClose }: LogoutDialogProps) {
  const cancelRef = useRef(null);

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent bg={useColorModeValue("white", "gray.800")} border="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")} borderRadius="lg">
            <AlertDialogHeader fontSize="lg" fontWeight="semibold" display="flex" alignItems="center" gap={2}>
              <Icon as={FiLogOut} color="#FF5252" boxSize={5} />
              Log out
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color={useColorModeValue("gray.700", "gray.300")}>Are you sure you want to log out? You’ll need to sign in again to continue.</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="red" bg={"#FF5252"} onClick={handleLogout} ml={3}>
                Log out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
