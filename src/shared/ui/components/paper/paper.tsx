import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import WithClassName from "../../helpers/withClassName";

const Paper: FC<PropsWithChildren<WithClassName>> = (props) => {
  const { children, className } = props;
  return (
    <div className={twMerge("bg-paper-bg border-primary-bg rounded-3xl border-2 grid", className)}>{children}</div>
  );
};

export default Paper;
