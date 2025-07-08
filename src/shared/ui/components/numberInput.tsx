import { FC } from "react";

interface NumberInputProps {
  required?: boolean;
  name?: string;
  defaultValue?: number;
  min?: number;
}

const NumberInput: FC<NumberInputProps> = (props) => {
  const { required, name, defaultValue, min } = props;

  return (
    <input
      type="number"
      className="appearance-none text-base text-right font-medium border-2 border-primary-bg hover:border-primary-bg-hover active:border-primary-bg-active motion-safe:transition-colors focus-visible:outline-2 outline-outline outline-offset-2 text-content p-3 rounded-2xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      required={required}
      name={name}
      min={min}
      defaultValue={defaultValue}
    />
  );
};

export default NumberInput;
