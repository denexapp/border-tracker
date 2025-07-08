import addEntryAndRedirect from "@/app/_api/addEntryAndRedirect";
import { validateSession } from "@/auth";
import { getEntries } from "@/entities/entry/api/getEntries";
import EntryComponentLink from "@/entities/entry/ui/entryComponentLink";
import ButtonForm from "@/shared/ui/button/buttonForm";
import H1 from "@/shared/ui/text/h1";
import { FC } from "react";

const Page: FC = async () => {
  await validateSession();
  const entries = await getEntries();

  const entryNodes = entries.map((entry) => (
    <EntryComponentLink key={entry.id} entry={entry} href={`/entries/${entry.id}`} />
  ));

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-2">
      <H1 className="py-2">entries</H1>
      <div className="flex flex-col gap-2 max-w-xl w-full">{entryNodes}</div>
      <ButtonForm className="sticky bottom-2" onClick={addEntryAndRedirect}>
        add new entry
      </ButtonForm>
    </div>
  );
};

export default Page;
