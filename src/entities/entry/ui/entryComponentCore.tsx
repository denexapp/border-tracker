import simpleDateToFormattedString from "@/shared/model/simpleDate/simpleDateToFormattedString";
import Paper from "@/shared/ui/components/paper/paper";
import H2 from "@/shared/ui/components/text/h2";
import H3 from "@/shared/ui/components/text/h3";
import Text from "@/shared/ui/components/text/text";
import { FC, ReactNode } from "react";
import { Entry } from "../model/entry/entry";

interface EntryComponentProps {
  entry: Entry;
}

const EntryComponentCore: FC<EntryComponentProps> = (props) => {
  const { entry } = props;

  const {
    fillableFields: { date, direction, region, additionalStatuses, way, number },
  } = entry;

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

  const entryNumberNode: string = number.value !== null ? `#${number.value}` : "Unknown number";

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-2 items-center">
          <H3>{dateNode}</H3>
          <H3>{directionNode}</H3>
        </div>
        <div className="flex gap-4 justify-between items-end">
          <div className="flex gap-4 items-center">
            <span className="text-2xl/6">{regionEmojiNode}</span>
            <div className="flex flex-col">
              <H2>{regionNameNode}</H2>
              <Text>{wayName ?? "Unknown way"}</Text>
            </div>
          </div>
          <Text>{entryNumberNode}</Text>
        </div>
      </div>
      {additionalStatusesNode}
    </>
  );
};

export default EntryComponentCore;
