import useAuthContext from "@/base/context/auth/hook";
import Button from "@/components/elements/button/button";
import Input from "@/components/elements/input/input";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function FormSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { signInUser } = useAuthContext();

  async function onSubmitHandler(e: FormEvent) {
    e.preventDefault();
    await signInUser(email, password);
    await router.replace("/dashboard");
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
