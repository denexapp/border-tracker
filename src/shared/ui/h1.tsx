import { FC, PropsWithChildren } from "react";

const H1: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <span className="text-xl text-text">{children}</span>;
};

export default H1;
