import Paper from "@/shared/ui/paper/paper";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Entry } from "../model/entry/entry";
import EntryComponentCore from "./entryComponentCore";

interface EntryComponentProps {
  entry: Entry;
  className?: string;
}

const EntryComponent: FC<EntryComponentProps> = (props) => {
  const { entry, className } = props;

  return (
    <Paper className={twMerge("flex flex-col gap-3 p-4", className)}>
      <EntryComponentCore entry={entry} />
    </Paper>
  );
};

export default EntryComponent;
