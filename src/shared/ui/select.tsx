import { FC } from "react";

export interface SelectEntry {
  value: string;
  label: string;
}

interface SelectProps {
  entries: Array<SelectEntry>;
  required?: boolean;
  name?: string;
  defaultValue?: string;
}

const Select: FC<SelectProps> = (props) => {
  const { required, name, defaultValue, entries } = props;

  let validatedDefaultValue: string | undefined = undefined;

  if (defaultValue !== undefined && entries.some(({ value }) => value === defaultValue)) {
    validatedDefaultValue = defaultValue;
  }

  const options = entries.map(({ value, label }) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

  return (
    <select
      className="appearance-none cursor-pointer text-base font-medium bg-primary-bg hover:bg-primary-bg-hover active:bg-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 text-primary-text py-3 px-6 rounded-2xl"
      required={required}
      name={name}
      defaultValue={validatedDefaultValue}
    >
      {options}
    </select>
  );
};

export default Select;
