interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form = ({ handleSubmit, children }: FormProps) => {
  return <form onSubmit={handleSubmit}>{children}</form>;
};
