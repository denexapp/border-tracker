import notion from "@/shared/notion/api/client";

const retrievePageWithProperties = async (id: string) => {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  return page;
};

export default retrievePageWithProperties;
