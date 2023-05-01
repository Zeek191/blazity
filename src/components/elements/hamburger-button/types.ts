export type HamburgerButtonProps = {
  state: boolean;
  variant: "light" | "dark";
  changeStateHandler: () => void;
  className?: string;
};
