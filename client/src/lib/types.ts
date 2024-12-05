export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
};

export type Admin = {
  id: string;
  username: string;
  name: string;
  email: string;
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
