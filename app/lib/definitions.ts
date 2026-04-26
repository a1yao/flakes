export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserLite = {
  id: string;
  name: string;
}

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  created_by: string;
}

export type EventLite = {
  id: string;
  name: string;
  date: string;
  time: string;
}