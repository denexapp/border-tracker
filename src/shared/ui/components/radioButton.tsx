import { FC, PropsWithChildren, useId } from "react";

interface RadioButtonProps {
  defaultValue?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
}

const RadioButton: FC<PropsWithChildren<RadioButtonProps>> = ({ defaultValue, name, required, children, value }) => {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={`group inline-flex items-center justify-between cursor-pointer bg-primary-bg hover:bg-primary-bg-hover has-active:bg-primary-bg-active motion-safe:has-active:scale-95 motion-safe:transition has-focus-visible:outline-2 outline-outline outline-offset-2 py-3 ps-6 pe-3 gap-3 rounded-2xl select-none`}
    >
      <span className="text-base font-medium text-primary-content">{children}</span>
      <input
        id={inputId}
        type="radio"
        className={`grid place-items-center cursor-[inherit] size-6 outline-none appearance-none bg-primary-content rounded-full after:content-['']  after:size-4 after:rounded-full after:bg-primary-bg group-has-hover:after:bg-primary-bg-hover group-has-active:after:bg-primary-bg-active motion-safe:after:transition-all not-checked:after:size-0`}
        defaultChecked={defaultValue}
        name={name}
        value={value}
        required={required}
      />
    </label>
  );
};

export default RadioButton;
