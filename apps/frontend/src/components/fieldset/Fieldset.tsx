interface FieldsetProps {
  legendText: string;
  children: React.ReactNode;
}

export const Fieldset = ({ legendText, children }: FieldsetProps) => {
  return (
    <fieldset className="fieldset p-4">
      <legend className="fieldset-legend">{legendText}</legend>
      {children}
    </fieldset>
  );
};
