import { Grid, Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Contacts from "./Contacts";
import ChatRoom from "./ChatRoom";
import ContactDetails from "./ContactDetails";

export default function DesktopLayout() {
  return (
    <Grid templateColumns="80px 300px 1fr 320px" h="100vh" w="100%" overflow="hidden" bg="layout.background">
      <Sidebar />
      <Contacts />
      <ChatRoom />
      <ContactDetails />
    </Grid>
  );
}
