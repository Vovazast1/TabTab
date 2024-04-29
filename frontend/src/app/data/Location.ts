import ActivityType from './ActivityType';
import Type from './Type';

export default interface Location {
  locationId: number;
  locationName: string;
  activity: ActivityType;
  type: Type;
  latitude: number;
  longitude: number;
  image: string;
}
