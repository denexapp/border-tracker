import { FC, PropsWithChildren, useId } from "react";

interface CheckboxProps {
  defaultValue?: boolean;
  name?: string;
  required?: boolean;
}

const Checkbox: FC<PropsWithChildren<CheckboxProps>> = ({ defaultValue, name, required, children }) => {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={`group inline-flex items-center justify-between cursor-pointer bg-primary-bg hover:bg-primary-bg-hover has-active:bg-primary-bg-active motion-safe:has-active:scale-95 motion-safe:transition has-focus-visible:outline-2 outline-outline outline-offset-2 py-3 ps-6 pe-3 gap-3 rounded-2xl select-none`}
    >
      <span className="text-base font-medium text-primary-content">{children}</span>
      <input
        id={inputId}
        type="checkbox"
        className={`cursor-[inherit] relative h-6 w-6 outline-none appearance-none bg-primary-content rounded-md after:content-[''] after:absolute after:rotate-45 after:left-2 after:top-1 after:w-2 after:h-3.5 after:border-primary-bg after:border-r-4 after:border-b-4 group-has-hover:after:border-primary-bg-hover group-has-active:after:border-primary-bg-active motion-safe:after:transition-all not-checked:after:border-0`}
        defaultChecked={defaultValue}
        name={name}
        required={required}
      />
    </label>
  );
};

export default Checkbox;
