interface LabelProps {
  children: React.ReactNode;
}

export const Label = ({ children }: LabelProps) => {
  return <label className="input validator">{children}</label>;
};
