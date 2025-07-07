import { FC, PropsWithChildren } from "react";

interface ButtonFormProps {
  onClick: () => void;
}

const ButtonForm: FC<PropsWithChildren<ButtonFormProps>> = (props) => {
  const { onClick, children } = props;
  return (
    <form className='contents' action={onClick}>
      <button className="cursor-pointer text-base font-medium bg-primary-bg hover:bg-primary-bg-hover active:bg-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 text-primary-content py-3 px-6 rounded-2xl">
        {children}
      </button>
    </form>
  );
};

export default ButtonForm;
