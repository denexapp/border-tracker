import notion from "@/shared/notion/api/client";
import { PageObjectResponse, QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

interface Options {
  filter?: QueryDatabaseParameters["filter"];
  sorts?: QueryDatabaseParameters["sorts"];
  limit?: number;
}

const queryDatabasePages = async (databaseId: string, options?: Options) => {
  const { sorts, limit, filter } = options ?? {};

  const results: Array<PageObjectResponse> = [];
  let hasMore = true;
  let resultsCountNotGteLimit: boolean = limit === undefined ? true : results.length < limit;
  let startCursor: string | null = null;

  while (hasMore && resultsCountNotGteLimit) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor ?? undefined,
      sorts,
      page_size: limit,
      filter,
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

    resultsCountNotGteLimit = limit === undefined ? true : results.length < limit;
  }

  return results;
};

export default queryDatabasePages;
