import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Entry, fillableEntryFieldExtractors } from "./entry";

export const entryFromPage = async (page: PageObjectResponse): Promise<Entry> => {
  const [direction, date, region, additionalStatuses, way] = await Promise.all([
    fillableEntryFieldExtractors.direction(page),
    fillableEntryFieldExtractors.date(page),
    fillableEntryFieldExtractors.region(page),
    fillableEntryFieldExtractors.additionalStatuses(page),
    fillableEntryFieldExtractors.way(page),
  ]);

  const entry: Entry = {
    id: page.id,
    fillableFields: {
      direction,
      date,
      region,
      additionalStatuses,
      way,
    },
  };

  return entry;
};
