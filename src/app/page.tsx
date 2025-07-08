import addEntryAndRedirect from "@/app/_api/addEntryAndRedirect";
import { validateSession } from "@/auth";
import { getEntries } from "@/entities/entry/api/getEntries";
import EntryComponentLink from "@/entities/entry/ui/entryComponentLink";
import ButtonForm from "@/shared/ui/button/buttonForm";
import H1 from "@/shared/ui/text/h1";
import Text from "@/shared/ui/text/text";
import { FC, ReactNode } from "react";

const Page: FC = async () => {
  await validateSession();
  const entries = await getEntries();
  let content: ReactNode;

  if (entries.length === 0) {
    content = <Text>no entries yet</Text>;
  } else {
    content = entries.map((entry) => <EntryComponentLink key={entry.id} entry={entry} href={`/entries/${entry.id}`} />);
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-2">
      <H1 className="py-2">entries</H1>
      <div className="flex gap-2 items-center w-full flex-col-reverse">
        <ButtonForm className="sticky bottom-2" onClick={addEntryAndRedirect}>
          add new entry
        </ButtonForm>
        <div className="flex flex-col gap-2 max-w-xl w-full">{content}</div>
      </div>
    </div>
  );
};

export default Page;
