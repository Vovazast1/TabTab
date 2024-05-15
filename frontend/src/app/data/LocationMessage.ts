import Avatar from "./Avatar";

export default interface LocationMessage {
  messageType: MessageType;
  message: string;
  locationId: number;
  userId: number;
  timestamp: Date;
  username: string;
  avatar: Avatar;
}

export enum MessageType {
  SERVER,
  CLIENT
}
