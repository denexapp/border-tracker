import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Entry, fillableEntryFieldExtractors } from "./entry";

export const entryFromPage = async (page: PageObjectResponse): Promise<Entry> => {
  const [number, direction, date, region, additionalStatuses, way] = await Promise.all([
    fillableEntryFieldExtractors.number(page),
    fillableEntryFieldExtractors.direction(page),
    fillableEntryFieldExtractors.date(page),
    fillableEntryFieldExtractors.region(page),
    fillableEntryFieldExtractors.additionalStatuses(page),
    fillableEntryFieldExtractors.way(page),
  ]);

  const entry: Entry = {
    id: page.id,
    fillableFields: {
      number,
      direction,
      date,
      region,
      additionalStatuses,
      way,
    },
  };

  return entry;
};
