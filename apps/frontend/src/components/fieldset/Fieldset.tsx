interface FieldsetProps {
  legendText: string;
  children: React.ReactNode;
}

export const Fieldset = ({ legendText, children }: FieldsetProps) => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">{legendText}</legend>
      {children}
    </fieldset>
  );
};
