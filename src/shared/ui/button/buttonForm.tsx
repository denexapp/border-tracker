import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import WithClassName from "../helpers/withClassName";

interface ButtonFormProps {
  onClick: () => void;
}

const ButtonForm: FC<PropsWithChildren<WithClassName<ButtonFormProps>>> = (props) => {
  const { onClick, children, className } = props;
  return (
    <form className="contents" action={onClick}>
      <button
        className={twMerge(
          "cursor-pointer text-base font-medium bg-primary-bg hover:bg-primary-bg-hover active:bg-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 text-primary-content py-3 px-6 rounded-2xl",
          className
        )}
      >
        {children}
      </button>
    </form>
  );
};

export default ButtonForm;
