import { propertyNameRegion, propertyNameRegionCode } from "@/entities/entry/config/consts";
import { Region } from "@/shared/model/region/region";
import regionFromRegionCode from "@/shared/model/region/regionFromRegionCode";
import retrievePaginatedPageProperty from "@/shared/notion/api/retrievePaginatedPageProperty";
import { EntryField, EntryFieldExtractor } from "../entryFieldExtractor";

export const region: EntryFieldExtractor<Region | null> = async (page) => {
  const entryTypeProperty = page.properties[propertyNameRegion];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "relation") {
    throw new Error("Incorrect format");
  }

  const regionPageId = entryTypeProperty.relation.at(0)?.id;

  let value: Region | null;

  if (regionPageId === undefined) {
    value = null;
  } else {
    const regionCodeProperty = await retrievePaginatedPageProperty(regionPageId, propertyNameRegionCode);

    const regionCode = regionCodeProperty
      .map((item) => {
        if (item.type !== "rich_text") {
          throw new Error("Incorrect format");
        }
        return item.rich_text.plain_text;
      })
      .join("");

    const region = regionFromRegionCode(regionCode);

    if (region === null) {
      throw new Error(`Region with code "${regionCode}" not found`);
    }

    value = region;
  }

  const filled = value !== null;

  const result: EntryField<Region | null> = {
    filled,
    value,
  };

  return result;
};
