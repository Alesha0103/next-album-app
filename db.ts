import { AuthForm } from "@/models/auth-form";

type ItemDB = AuthForm & {
  id: number;
};

export const testDataBase: ItemDB[] = [
  {
    id: 1,
    name: "Oleksii",
    email: "oleksii@test.com",
    password: "Alex1234"
  },
  {
    id: 3,
    name: "Oleh",
    email: "oleh@test.com",
    password: "12oleH34"
  },
  {
    id: 27,
    name: "Vlad",
    email: "vlad@test.com",
    password: "vLad1234"
  }
]