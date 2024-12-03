export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  author: {
    name: string;
    email: string;
  };
};
