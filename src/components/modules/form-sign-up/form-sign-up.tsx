import useAuth from "@/base/hooks/useAuth";
import Button from "@/components/elements/button/button";
import Input from "@/components/elements/input/input";
import { FormEvent, useState } from "react";

export default function FormSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUpHandler } = useAuth();

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    signUpHandler(email, password);
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col max-w-[500px] mx-auto"
    >
      <Input
        id="name"
        label="Name"
        placeholder="Eg. Max"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="email"
        label="E-mail"
        placeholder="Eg. xyz@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Eg. Zaq123WSX"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="mt-10">
        Sign Up
      </Button>
    </form>
  );
}
