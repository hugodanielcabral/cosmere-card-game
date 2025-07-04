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
    <button className={"btn" + `${className}`} {...props}>
      {children}
    </button>
  );
};
