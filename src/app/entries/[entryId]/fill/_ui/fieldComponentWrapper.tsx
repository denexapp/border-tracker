import { FC, ReactNode } from "react";

interface FieldComponentWrapperProps {
  children: ReactNode;
}

const FieldComponentWrapper: FC<FieldComponentWrapperProps> = ({ children }) => (
  <div className="flex flex-col gap-4 items-center w-full">{children}</div>
);

export default FieldComponentWrapper;
