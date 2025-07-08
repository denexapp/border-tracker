import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Entry, fillableEntryFieldExtractors } from "./entry";
import getPageNotionUrl from "@/shared/notion/lib/getPageNotionUrl";

export const entryFromPage = async (page: PageObjectResponse): Promise<Entry> => {
  const [number, direction, date, region, additionalStatuses, way] = await Promise.all([
    fillableEntryFieldExtractors.number(page),
    fillableEntryFieldExtractors.direction(page),
    fillableEntryFieldExtractors.date(page),
    fillableEntryFieldExtractors.region(page),
    fillableEntryFieldExtractors.additionalStatuses(page),
    fillableEntryFieldExtractors.way(page),
  ]);

  const notionUrl = getPageNotionUrl(page);

  const entry: Entry = {
    id: page.id,
    notionUrl,
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
