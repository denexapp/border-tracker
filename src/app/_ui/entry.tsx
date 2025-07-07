import type { Entry } from "@/entities/entry/model/entry/entry";
import encodeUrlParams from "@/shared/lib/url/encodeUrlParams";
import H3 from "@/shared/ui/text/h3";
import PaperLink from "@/shared/ui/paper/paperLink";
import { FC, ReactNode } from "react";
import simpleDateToFormattedString from "@/shared/model/simpleDate/simpleDateToFormattedString";
import Text from "@/shared/ui/text/text";
import H2 from "@/shared/ui/text/h2";
import { locale } from "@/shared/config/consts";
import Paper from "@/shared/ui/paper/paper";

interface EntryProps {
  entry: Entry;
}

const Entry: FC<EntryProps> = (props) => {
  const { entry } = props;

  const { additionalStatuses, date, direction, region, way } = entry.fillableFields;

  const dateNode = date.value ? simpleDateToFormattedString(date.value) : "Unknown date";
  const directionNode =
    direction.value === null ? "Unknown direction" : direction.value === "arrival" ? "Arrival" : "Departure";
  const regionEmojiNode = region.value?.emoji ?? "🏳️";
  const regionNameNode = region.value?.name ?? "Unknown region";

  let additionalStatusesNode: ReactNode = null;

  if (additionalStatuses.value.length > 0) {
    const additionalStatusNodes = additionalStatuses.value.map((status) => (
      <Paper key={status}>
        <span className=" px-2 py-1">
          <Text>{additionalStatuses.meta.find((meta) => meta.id === status)?.name ?? "Unknown status"}</Text>
        </span>
      </Paper>
    ));

    additionalStatusesNode = <div className="flex flex-wrap gap-2">{additionalStatusNodes}</div>;
  }

  let wayName: string | null = null;

  if (way.value !== null) {
    wayName = way.meta.find((meta) => meta.id === way.value)?.name ?? null;
  }

  return (
    <PaperLink href={encodeUrlParams`/entries/${entry.id}`}>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2 items-center">
            <H3>{dateNode}</H3>
            <H3>{directionNode}</H3>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-2xl/6">{regionEmojiNode}</span>
            <div className="flex flex-col">
              <H2>{regionNameNode}</H2>
              <Text>{wayName ?? "Unknown way"}</Text>
            </div>
          </div>
        </div>
        {additionalStatusesNode}
      </div>
    </PaperLink>
  );
};

export default Entry;
