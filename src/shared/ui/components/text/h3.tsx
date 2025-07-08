import { FC, PropsWithChildren } from "react";

const H3: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <span className="text-lg text-content font-semibold">{children}</span>;
};

export default H3;
