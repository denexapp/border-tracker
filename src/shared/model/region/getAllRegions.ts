import { Region } from "@/shared/model/region/region";
import regionFromRegionCode from "@/shared/model/region/regionFromRegionCode";

const codePointA = 65;
const codePointZ = 90;

const getAllRegions = (): Array<Region> => {
  const regions = [];

  for (let firstCharCodePoint = codePointA; firstCharCodePoint <= codePointZ; firstCharCodePoint++) {
    for (let secondCharCodePoint = codePointA; secondCharCodePoint <= codePointZ; secondCharCodePoint++) {
      const regionCode = String.fromCharCode(firstCharCodePoint) + String.fromCharCode(secondCharCodePoint);
      const region = regionFromRegionCode(regionCode);

      if (region !== null) {
        regions.push(region);
      }
    }
  }

  return regions;
};

export default getAllRegions;
