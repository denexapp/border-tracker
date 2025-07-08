import PaperLink from "@/shared/ui/components/paper/paperLink";
import { FC } from "react";
import { Entry } from "../model/entry/entry";
import EntryComponentCore from "./entryComponentCore";
import { twMerge } from "tailwind-merge";

interface EntryComponentProps {
  entry: Entry;
  href: string;
  className?: string;
}

const EntryComponentLink: FC<EntryComponentProps> = (props) => {
  const { entry, href, className } = props;

  return (
    <PaperLink href={href} className={twMerge("flex flex-col gap-3 p-4", className)}>
      <EntryComponentCore entry={entry} />
    </PaperLink>
  );
};

export default EntryComponentLink;
