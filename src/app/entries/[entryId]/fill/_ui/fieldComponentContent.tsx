import { FC, ReactNode } from "react";

interface FieldComponentWrapperProps {
  children: ReactNode;
}

const FieldComponentContent: FC<FieldComponentWrapperProps> = ({ children }) => (
  <div className="flex flex-col gap-2 items-stretch max-w-xs w-full">{children}</div>
);

export default FieldComponentContent;
