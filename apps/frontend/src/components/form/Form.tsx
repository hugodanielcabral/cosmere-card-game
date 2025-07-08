interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className: string;
}

export const Form = ({ className = "", handleSubmit, children }: FormProps) => {
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
