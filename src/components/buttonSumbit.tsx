import { FC, PropsWithChildren } from "react";

const ButtonSubmit: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <button
      type="submit"
      className="cursor-pointer text-base font-medium bg-primary-bg hover:bg-primary-bg-hover active:bg-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 text-primary-text py-3 px-6 rounded-2xl"
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
