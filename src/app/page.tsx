import addEntryAndRedirect from "@/app/_api/addEntryAndRedirect";
import { validateSession } from "@/auth";
import { getEntries } from "@/entities/entry/api/getEntries";
import EntryComponentLink from "@/entities/entry/ui/entryComponentLink";
import ButtonForm from "@/shared/ui/components/button/buttonForm";
import H1 from "@/shared/ui/components/text/h1";
import Text from "@/shared/ui/components/text/text";
import ViewTransition from "@/shared/ui/components/viewTransition";
import { FC, ReactNode } from "react";

const Page: FC = async () => {
  await validateSession();
  const entries = await getEntries();
  let content: ReactNode;

  if (entries.length === 0) {
    content = <Text>no entries yet</Text>;
  } else {
    content = entries.map((entry) => (
      <ViewTransition name={`entry-transition-${entry.id}`} key={entry.id}>
        <EntryComponentLink entry={entry} href={`/entries/${entry.id}`} />
      </ViewTransition>
    ));
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-6">
      <ViewTransition name={"h1-transition"}>
        <H1>entries</H1>
      </ViewTransition>
      <div className="flex gap-4 items-center w-full flex-col-reverse">
        <ViewTransition name={"action-button-1-transition"}>
          <ButtonForm className="sticky bottom-6" onClick={addEntryAndRedirect}>
            add new entry
          </ButtonForm>
        </ViewTransition>
        <div className="flex flex-col gap-2 max-w-xl w-full">{content}</div>
      </div>
    </div>
  );
};

export default Page;
