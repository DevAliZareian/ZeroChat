// pages/friends/Friends.tsx
import { Flex } from "@chakra-ui/react";
import FriendsList from "./FriendsList";
import FriendDetails from "./FriendDetails";

export default function Friends() {
  return (
    <Flex h="100%" w="100%">
      <FriendsList />
      <FriendDetails />
    </Flex>
  );
}
