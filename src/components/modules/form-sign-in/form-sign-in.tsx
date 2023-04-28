import Button from "@/components/elements/button/button";
import Input from "@/components/elements/input/input";
import { FormEvent, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function FormSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler() {
    await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col max-w-[500px] mx-auto"
    >
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
        Sign In
      </Button>
    </form>
  );
}
