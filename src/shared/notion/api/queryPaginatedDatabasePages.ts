import notion from "@/shared/notion/api/client";
import { PageObjectResponse, QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const queryPaginatedDatabasePages = async (databaseId: string, sorts?: QueryDatabaseParameters["sorts"]) => {
  const results: Array<PageObjectResponse> = [];
  let hasMore = true;
  let startCursor: string | null = null;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor ?? undefined,
      sorts,
    });

    hasMore = response.has_more;
    startCursor = response.next_cursor;

    response.results.forEach((page) => {
      if (page.object !== "page") {
        throw new Error("Expected a page object in the results");
      }

      if (!("properties" in page)) {
        throw new Error("Page object does not have properties");
      }

      results.push(page);
    });
  }

  return results;
};

export default queryPaginatedDatabasePages;
