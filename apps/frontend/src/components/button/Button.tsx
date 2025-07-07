interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  className = "btn btn-info",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${className}`} {...props}>
      {children}
    </button>
  );
};
