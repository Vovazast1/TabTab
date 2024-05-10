export default interface LocationMessageDto {
  messageType: MessageType;
  message: string;
  locationId: number;
  userId: number;
}

export enum MessageType {
  SERVER,
  CLIENT
}
