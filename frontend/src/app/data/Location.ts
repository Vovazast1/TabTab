import ActivityType from './ActivityType';

export default interface Location {
  locationId: number;
  locationName: string;
  activity: ActivityType;
  type: string;
  latitude: number;
  longitude: number;
}
