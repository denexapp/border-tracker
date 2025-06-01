import { SimpleRegion } from "@/models/simpleRegion/simpleRegion";
import simpleRegionFromRegionCode from "@/models/simpleRegion/simpleRegionFromRegionCode";
import { headers } from "next/headers";

const estimateUserRegion = async (): Promise<SimpleRegion | null> => {
  const requestHeaders = await headers();

  const estimatedUserRegionCode = requestHeaders.get("x-vercel-ip-country");

  if (estimatedUserRegionCode === null) {
    console.debug("Vercel ip country header is not available");
    return null;
  }

  console.debug("Vercel ip country header:", estimatedUserRegionCode);

  const estimatedUserRegion = simpleRegionFromRegionCode(estimatedUserRegionCode);

  if (estimatedUserRegion === null) {
    console.debug("Failed to parse region from code:", estimatedUserRegionCode);
    return null;
  } else {
    console.debug("Estimated user region:", JSON.stringify(estimatedUserRegion, null, 2));
  }

  return estimatedUserRegion;
};

export default estimateUserRegion;
