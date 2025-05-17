import { validateSession } from "@/auth";
import Text from "@/components/text";
import { EntryKey } from "@/models/entryType/entry";
import { getUnfilledEntryKey } from "@/models/entryType/getUnfilledEntryKey";
import notion from "@/notion";
import { FC, ReactNode } from "react";
import { getEntry } from "../../../models/entryType/getEntry";
import { FieldComponent } from "./_fields/fieldComponent";
import Type from "./_fields/type";
import Date from "./_fields/date";

interface PageProps {
  params: Promise<{
    entryId: string;
  }>;
}

const fieldComponents: Record<EntryKey, FieldComponent> = {
  type: Type,
  date: Date,
};

const Page: FC<PageProps> = async (props) => {
  const { params } = props;
  const { entryId } = await params;
  await validateSession();

  const page = await notion.pages.retrieve({
    page_id: entryId,
  });

  const entry = getEntry(page);
  const unfilledEntryKey = getUnfilledEntryKey(entry);

  let content: ReactNode;

  if (unfilledEntryKey === null) {
    content = <Text>all fields have been filled, yay</Text>;
  } else {
    const FieldComponent = fieldComponents[unfilledEntryKey];
    content = <FieldComponent entryId={entryId} />;
  }

  return <div className="grid place-items-center p-2">{content}</div>;
};

export default Page;
