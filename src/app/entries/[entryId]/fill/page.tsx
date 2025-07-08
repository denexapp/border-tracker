import { validateSession } from "@/auth";
import { getUnfilledEntryKey } from "@/entities/entry/lib/getUnfilledEntryKey";
import { FillableEntryFieldKey } from "@/entities/entry/model/entry/entry";
import Text from "@/shared/ui/text/text";
import { FC, ReactNode } from "react";
import { getEntry } from "../../../../entities/entry/api/getEntry";
import { FieldComponent } from "./_lib/fieldComponent";
import AdditionalStatuses from "./_ui/additionalStatuses";
import Date from "./_ui/date";
import Direction from "./_ui/direction";
import Region from "./_ui/region";
import Way from "./_ui/way";
import Number from "./_ui/number";

interface PageProps {
  params: Promise<{
    entryId: string;
  }>;
}

const fieldComponents: Record<FillableEntryFieldKey, FieldComponent> = {
  number: Number,
  direction: Direction,
  date: Date,
  region: Region,
  additionalStatuses: AdditionalStatuses,
  way: Way,
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
    content = <FieldComponent entry={entry} />;
  }

  return <div className="grid place-items-center p-2">{content}</div>;
};

export default Page;
