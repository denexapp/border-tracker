import notion from "@/shared/notion/api/client";

const retrieveDatabase = async (databaseId: string) => {
  const database = await notion.databases.retrieve({
    database_id: databaseId,
  });

  return database;
};

export default retrieveDatabase;
