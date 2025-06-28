import { Grid } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Home from "./home/Home";
import { useSidebarStore } from "@/store/useSidebarStore";
import Settings from "./settings/Settings";
import Friends from "./friends/Friends";

export default function DesktopLayout() {
  const activeSection = useSidebarStore((s) => s.activeSection);
  const columns = activeSection === "chats" ? "80px 300px 1fr 340px" : activeSection === "friends" ? "80px 1fr 340px" : "80px 1fr";
  return (
    <Grid templateColumns={columns} h="100vh" w="100%" overflow="hidden" bg="layout.background">
      <Sidebar />
      {activeSection === "chats" && <Home />}
      {activeSection === "friends" && <Friends />}
      {activeSection === "settings" && <Settings />}
    </Grid>
  );
}
