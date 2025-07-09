interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className: string;
}

export const Form = ({ className = "", onSubmit, children }: FormProps) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
