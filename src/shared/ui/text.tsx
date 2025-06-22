import { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <span className="text-base text-text">{children}</span>;
};

export default Text;
