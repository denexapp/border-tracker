import { FC, PropsWithChildren } from "react";

const H1: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <span className="text-xl text-content">{children}</span>;
};

export default H1;
