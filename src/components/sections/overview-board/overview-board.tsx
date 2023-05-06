import useAuthContext from "@/base/context/auth/hook";
import Input from "@/components/elements/input/input";

export default function OverviewBoard() {
  const { user, info } = useAuthContext();

  if (!user) return null;
  return (
    <form className="w-full md:max-w-[500px] mt-8">
      <Input
        id="email"
        label="E-mail"
        value={user?.email || ""}
        className="w-full"
        disabled
      />
      <Input
        id="customer-id"
        label="Customer ID"
        value={info?.stripeId}
        className="w-full"
        disabled
      />
      <Input id="name" label="Name" value={info?.name} className="w-full" />
      <Input
        id="surname"
        label="Surname"
        value={info?.surname}
        className="w-full"
      />
    </form>
  );
}
