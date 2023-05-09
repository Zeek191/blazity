import { ROUTES } from "@/base/consts/routes";
import useAuthContext from "@/base/context/auth/hook";
import useUsersFirestore from "@/base/hooks/use-users-firestore";
import { createStripeUser } from "@/base/services/stripe/users";
import Button from "@/components/elements/button/button";
import Input from "@/components/elements/input/input";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function FormSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();
  const { signUpUser } = useAuthContext();
  const { createUserRecord } = useUsersFirestore();

  async function onSubmitHandler(e: FormEvent) {
    try {
      e.preventDefault();
      await signUpUser(email, password);
      const stripeUser = await createStripeUser({ email, name, surname });
      await createUserRecord({ email, name, surname, stripeId: stripeUser.id });
      await router.replace(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="text-xl md:text-6xl font-bold max-w-[700px] mb-8 text-center mx-auto">
        Sign up
      </h1>
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
          required
        />
        <Input
          id="surname"
          label="Surname"
          placeholder="Eg. Park"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <Input
          id="email"
          label="E-mail"
          placeholder="Eg. xyz@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Eg. Zaq123WSX"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="mt-10">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
