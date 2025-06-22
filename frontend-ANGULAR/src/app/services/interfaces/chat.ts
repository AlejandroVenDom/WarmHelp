import { User } from "./user";
export interface Chat {
  participants: any;
  id: number;
  messages: any[]; // o tu tipo de mensaje real
  firstUser: User;
  secondUser: User;
}
