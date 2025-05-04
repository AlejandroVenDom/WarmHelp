export interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  username:string;
  comments: Comment[];
  likes_posts: LikesPost[];
}
export interface LikesPost {
  userName: string;
  createdAt: string;
}
