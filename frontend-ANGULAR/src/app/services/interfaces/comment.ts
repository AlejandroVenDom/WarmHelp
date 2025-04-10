import { ResponseComment } from "./response-coment";

export interface Comment {
  id: number;
  description: string;
  createdAt: string;
  username: string;
  responseComments: ResponseComment[];
}
