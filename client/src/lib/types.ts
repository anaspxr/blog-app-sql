export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  image?: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  author: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};
