import useAuthContext from "@/base/context/auth/hook";
import useAsyncLoader from "@/base/hooks/use-async-loader";
import { stripe } from "@/base/services/stripe";
import Link from "@/components/elements/link/link";
import Spinner from "@/components/elements/spinner/spinner";
import { useState } from "react";
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

  const resultsLoaded = useAsyncLoader({
    cb: getCharges,
    dependencies: [info?.stripeId],
  });

  console.log(info?.stripeId);
  if (!charges.length && !resultsLoaded) return <Spinner className="mt-8" />;
  if (!info?.stripeId) return null;

  return (
    <ul className="mt-8 w-full md:px-8 max-w-[800px]">
      {charges.map((charge) => (
        <li
          key={charge.id}
          className="border-2 border-gray-400 w-full py-4 px-8 rounded-md flex justify-between items-center mb-4"
        >
          <div>
            {charge.id && (
              <p className=" text-lg md:text-xl text-gray-400">{charge.id}</p>
            )}
            {charge.amount && (
              <p className="font-bold">
                ${charge.amount / 100} {charge.currency.toUpperCase()}
              </p>
            )}
          </div>
          {charge.receipt_url && <Link href={charge.receipt_url}>Receipt</Link>}
        </li>
      ))}
    </ul>
  );
}
