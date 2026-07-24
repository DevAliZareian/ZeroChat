import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import ContactDetails from "./ContactDetails";
import Contacts from "./Contacts";
import WaitingRoom from "./WaitingRoom";

export default function Home() {
  const { id } = useParams();
  return (
    <>
      <Contacts />
      {id ? <ChatRoom chatId={id} /> : <WaitingRoom />}
      <ContactDetails />
    </>
  );
}
