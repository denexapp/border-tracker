import { propertyValueIdDirectionArrival, propertyValueIdDirectionDeparture } from "@/entities/entry/config/consts";
import { Direction } from "./direction";

const directionToValueIdMap: Record<Direction, string> = {
  arrival: propertyValueIdDirectionArrival,
  departure: propertyValueIdDirectionDeparture,
};

const directionToPropertyValueId = (direction: Direction) => directionToValueIdMap[direction];

export default directionToPropertyValueId;
