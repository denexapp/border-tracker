import { cache } from "react";
import retrievePaginatedPageProperty from "../retrievePaginatedPageProperty";

const retrieveCachedPaginatedPageProperty = cache(retrievePaginatedPageProperty);

export default retrieveCachedPaginatedPageProperty;
