export default interface LocationMessageDto {
  messageType: MessageType;
  message: string;
  locationId: number;
  userId: number;
}

enum MessageType {
  SERVER,
  CLIENT
}
