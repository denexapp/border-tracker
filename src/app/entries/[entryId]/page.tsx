import { validateSession } from "@/auth";
import Text from "@/shared/ui/text";
import { EntryKey } from "@/entities/entry/model/entry/entry";
import { getUnfilledEntryKey } from "@/entities/entry/lib/getUnfilledEntryKey";
import { FC, ReactNode } from "react";
import { getEntry } from "../../../entities/entry/api/getEntry";
import Date from "./_ui/date";
import { FieldComponent } from "./_lib/fieldComponent";
import Region from "./_ui/region";
import Direction from "./_ui/direction";
import AdditionalStatuses from "./_ui/additionalStatuses";

interface PageProps {
  params: Promise<{
    entryId: string;
  }>;
}

const fieldComponents: Record<EntryKey, FieldComponent> = {
  direction: Direction,
  date: Date,
  region: Region,
  additionalStatuses: AdditionalStatuses
};

const Page: FC<PageProps> = async (props) => {
  const { params } = props;
  await validateSession();
  const { entryId } = await params;
  const entry = await getEntry(entryId);
  const unfilledEntryKey = getUnfilledEntryKey(entry);
  let content: ReactNode;

  if (unfilledEntryKey === null) {
    content = <Text>all fields have been filled, yay</Text>;
  } else {
    const FieldComponent = fieldComponents[unfilledEntryKey];
    content = <FieldComponent entryId={entryId} entry={entry} />;
  }

  return <div className="grid place-items-center p-2">{content}</div>;
};

export default Page;
