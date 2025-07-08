import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import WithClassName from "../../helpers/withClassName";

const H1: FC<PropsWithChildren<WithClassName>> = (props) => {
  const { children, className } = props;
  return <span className={twMerge("text-2xl text-content font-bold", className)}>{children}</span>;
};

export default H1;
