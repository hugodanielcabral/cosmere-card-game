import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  className = "btn-info",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={twMerge(clsx("btn", className))} {...props}>
      {children}
    </button>
  );
};
