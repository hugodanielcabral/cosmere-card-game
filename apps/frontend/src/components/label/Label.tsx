import clsx from "clsx";

interface LabelProps {
  className?: string;
  children: React.ReactNode;
}

export const Label = ({ className, children }: LabelProps) => {
  return <label className={clsx("input", className)}>{children}</label>;
};
