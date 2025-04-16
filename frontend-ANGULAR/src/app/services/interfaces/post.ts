export interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  username:string;
  comments: Comment[];
}
