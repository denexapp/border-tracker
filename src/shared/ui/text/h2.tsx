import { FC, PropsWithChildren } from "react";

const H2: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <span className="text-xl text-content font-semibold">{children}</span>;
};

export default H2;
