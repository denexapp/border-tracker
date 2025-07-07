import { cache } from "react";
import retrieveDatabase from "../retrieveDatabase";

const retrieveCachedDatabase = cache(retrieveDatabase);

export default retrieveCachedDatabase;
