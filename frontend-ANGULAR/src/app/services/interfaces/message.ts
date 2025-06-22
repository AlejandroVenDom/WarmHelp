import { Chat } from "./chat";
import { User } from "./user";
export interface Message {
  id?: number;
  content: string;
  timestamp?: string;
  sender?: User;
  chat: Chat;
}
