import { FC, PropsWithChildren } from "react";

const H1: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <span className="text-2xl text-content font-bold">{children}</span>;
};

export default H1;
