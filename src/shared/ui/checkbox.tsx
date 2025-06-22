import { FC, PropsWithChildren } from "react";

interface CheckboxProps {
  defaultValue?: boolean;
  name?: string;
  required?: boolean;
}

export const checkboxValue = 'true' as const;

// todo: check styles
const Checkbox: FC<PropsWithChildren<CheckboxProps>> = ({ defaultValue, name, required, children }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
        defaultChecked={defaultValue}
        value={checkboxValue}
        name={name}
        required={required}
      />
      <span className="ml-2 text-primary-text">{children}</span>
    </label>
  );
};

export default Checkbox;
