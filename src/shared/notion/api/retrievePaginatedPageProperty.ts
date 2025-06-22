import notion from "@/shared/notion/api/client";
import { PropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const retrievePaginatedPageProperty = async (pageId: string, propertyId: string) => {
  const results: Array<PropertyItemObjectResponse> = [];
  let hasMore = true;
  let startCursor: string | null = null;

  while (hasMore) {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
      start_cursor: startCursor ?? undefined,
    });

    if (response.object !== "list") {
      throw new Error("Incorrect format");
    }

    hasMore = response.has_more;
    startCursor = response.next_cursor;
    results.push(...response.results);
  }

  return results;
};

export default retrievePaginatedPageProperty;
