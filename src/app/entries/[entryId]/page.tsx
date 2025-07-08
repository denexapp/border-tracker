import { validateSession } from "@/auth";
import { getEntry } from "@/entities/entry/api/getEntry";
import EntryComponent from "@/entities/entry/ui/entryComponent";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import ButtonLink from "@/shared/ui/button/buttonLink";
import H1 from "@/shared/ui/text/h1";
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
      <H1 className="py-2">entry</H1>
      <EntryComponent entry={entry} className="max-w-xl w-full" />
      <ButtonLink href={encodeUrlParams`/entries/${entryId}/fill`}>fill entry</ButtonLink>
    </div>
  );
};

export default Page;
