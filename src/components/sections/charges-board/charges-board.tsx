import useAuthContext from "@/base/context/auth/hook";
import { stripe } from "@/base/services/stripe";
import Link from "@/components/elements/link/link";
import Spinner from "@/components/elements/spinner/spinner";
import { useEffect, useState } from "react";
import type Stripe from "stripe";

export default function ChargesBoard() {
  const [charges, setCharges] = useState<Stripe.Charge[]>([]);
  const { info } = useAuthContext();

  async function getCharges() {
    const charges = await stripe.charges.list({
      customer: info?.stripeId,
    });

    return setCharges(charges.data);
  }

  useEffect(() => {
    getCharges();
  }, []);

  if (!charges.length) return <Spinner className="mt-8" />;

  return (
    <ul className="mt-8 w-full md:px-8 max-w-[800px] max-h-[350px] overflow-y-auto">
      {charges.map((charge) => (
        <li
          key={charge.id}
          className="border-2 border-gray-400 w-full py-4 px-8 rounded-md flex justify-between items-center mb-4"
        >
          {charge.receipt_number && (
            <p className="font-bold text-lg md:text-2xl">
              #{charge.receipt_number}
            </p>
          )}
          {charge.receipt_url && <Link href={charge.receipt_url}>Receipt</Link>}
        </li>
      ))}
    </ul>
  );
}
