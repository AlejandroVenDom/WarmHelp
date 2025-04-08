export interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  userInfo?: {
    user?: {
      username: string;
    };
  };
  comments?: {
    id?: number;
    description: string;
    createdAt: string;
    userInfo?: {
      user?: {
        username: string;
      };
    };
  }[];
}
