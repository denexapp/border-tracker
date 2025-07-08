import { FC, PropsWithChildren } from "react";
import WithClassName from "../helpers/withClassName";
import { twMerge } from "tailwind-merge";

const H1: FC<PropsWithChildren<WithClassName>> = (props) => {
  const { children, className } = props;
  return <span className={twMerge("text-2xl text-content font-bold", className)}>{children}</span>;
};

export default H1;
