import { FC, PropsWithChildren } from "react";

const Paper: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <div className="bg-paper-bg rounded-3xl border-2 grid">{children}</div>;
};

export default Paper;
