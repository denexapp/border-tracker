import { SimpleRegion } from "@/models/simpleRegion/simpleRegion";
import simpleRegionFromRegionCode from "@/models/simpleRegion/simpleRegionFromRegionCode";

const codePointA = 65;
const codePointZ = 90;

const getAllRegions = (): Array<SimpleRegion> => {
  const regions = [];

  for (let firstCharCodePoint = codePointA; firstCharCodePoint <= codePointZ; firstCharCodePoint++) {
    for (let secondCharCodePoint = codePointA; secondCharCodePoint <= codePointZ; secondCharCodePoint++) {
      const regionCode = String.fromCharCode(firstCharCodePoint) + String.fromCharCode(secondCharCodePoint);
      const region = simpleRegionFromRegionCode(regionCode);

      if (region !== null) {
        regions.push(region);
      }
    }
  }

  return regions;
};

export default getAllRegions;
