CREATE TABLE tabtab.user_message (
     FromUserID int NOT NULL,
     ToUserID int NOT NULL,
     UserMessageID int NOT NULL AUTO_INCREMENT,
     Message varchar(1024) NOT NULL ,
     Timestamp TIMESTAMP NOT NULL ,
     PRIMARY KEY (UserMessageID),
     KEY FromUserID (FromUserID),
     KEY ToUserID (ToUserID),
     CONSTRAINT user_message_ibfk_1 FOREIGN KEY (FromUserID) REFERENCES user (UserID),
     CONSTRAINT user_message_ibfk_2 FOREIGN KEY (ToUserID) REFERENCES user (UserID)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci