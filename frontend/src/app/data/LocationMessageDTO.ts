export default interface LocationMessageDto {
  messageType: MessageType;
  message: string;
  locationId: number;
  userId: number;
  timestamp: Date;
}

export enum MessageType {
  SERVER,
  CLIENT
}
