import { validateSession } from "@/auth";
import { getEntry } from "@/entities/entry/api/getEntry";
import EntryComponent from "@/entities/entry/ui/entryComponent";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import ButtonLink from "@/shared/ui/components/button/buttonLink";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import { FC } from "react";

interface PageProps {
  params: Promise<{
    entryId: string;
  }>;
}

const Page: FC<PageProps> = async (props) => {
  const { params } = props;
  await validateSession();
  const { entryId } = await params;
  const entry = await getEntry(entryId);

  return (
    <div className="flex flex-col gap-2 items-center justify-center p-2">
      <ViewTransition name={"h1-transition"}>
        <H1 className="py-2">entry</H1>
      </ViewTransition>
      <ViewTransition name={`entry-transition-${entry.id}`}>
        <EntryComponent entry={entry} className="max-w-xl w-full" />
      </ViewTransition>
      <div className="flex gap-2 items-center">
        <ViewTransition name={"action-button-1-transition"}>
          <ButtonLink href={encodeUrlParams`/entries/${entryId}/fill`}>fill entry</ButtonLink>
        </ViewTransition>
        <ViewTransition name={"action-button-2-transition"}>
          <ButtonLink href={entry.notionUrl}>open in notion</ButtonLink>
        </ViewTransition>
      </div>
    </div>
  );
};

export default Page;
