import ActivityType from './ActivityType';
import { Sport, Intelligence } from './Type';

export default interface Location {
  locationId: number;
  locationName: string;
  activity: ActivityType;
  type: Sport | Intelligence;
  latitude: number;
  longitude: number;
  image: string;
}
