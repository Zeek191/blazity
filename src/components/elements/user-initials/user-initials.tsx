import { UserInitialsProps } from "./types";

export default function UserInitials({ name, surname }: UserInitialsProps) {
  if (!name || !surname) return null;

  return (
    <div className="w-32 h-32 border-2 rounded-full border-blue-400 text-center flex items-center justify-center font-bold text-4xl">
      <p>
        {name[0]}
        {surname[0]}
      </p>
    </div>
  );
}
