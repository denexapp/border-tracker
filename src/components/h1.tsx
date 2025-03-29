import { FC, PropsWithChildren } from "react";

const H1: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <h1 className="text-2xl text-text">{children}</h1>;
};

export default H1;
