export type MessageType = {
  id: string;
  text: string;
  status: "incoming" | "outgoing";
  timestamp: string;
};
