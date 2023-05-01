import { PropsWithChildren } from "react";

export default function FullHeightContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      {children}
    </div>
  );
}
