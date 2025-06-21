import { propertyNameRegion, propertyNameRegionCode } from "@/consts";
import { Region } from "@/models/region/region";
import { EntryFieldExtractor } from "../entryFieldExtractor";
import regionFromRegionCode from "@/models/region/regionFromRegionCode";
import retrievePaginatedPageProperty from "@/notion/retrievePaginatedPageProperty";

export const region: EntryFieldExtractor<Region> = async (page) => {
  const entryTypeProperty = page.properties[propertyNameRegion];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "relation") {
    throw new Error("Incorrect format");
  }

  const regionPageId = entryTypeProperty.relation.at(0)?.id;

  if (regionPageId === undefined) {
    return null;
  }

  const regionCodeProperty = await retrievePaginatedPageProperty(regionPageId, propertyNameRegionCode);

  const regionCode = regionCodeProperty
    .map((item) => {
      if (item.type !== "rich_text") {
        throw new Error("Incorrect format");
      }
      return item.rich_text.plain_text;
    })
    .join("");

  const simpleRegion = regionFromRegionCode(regionCode);

  if (simpleRegion === null) {
    throw new Error(`Region with code "${regionCode}" not found`);
  }

  return simpleRegion;
};
