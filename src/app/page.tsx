import addEntryAndRedirect from "@/app/_api/addEntryAndRedirect";
import { validateSession } from "@/auth";
import { getEntries } from "@/entities/entry/api/getEntries";
import ButtonForm from "@/shared/ui/button/buttonForm";
import H1 from "@/shared/ui/text/h1";
import { FC } from "react";
import Entry from "./_ui/entry";

const Page: FC = async () => {
  await validateSession();
  const entries = await getEntries();

  const entryNodes = entries.map((entry) => <Entry key={entry.id} entry={entry} />);

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-2">
      <H1>entries</H1>
      <ButtonForm onClick={addEntryAndRedirect}>add new entry</ButtonForm>
      <div className="flex flex-col gap-2 max-w-xl w-full">{entryNodes}</div>
    </div>
  );
};

export default Page;
