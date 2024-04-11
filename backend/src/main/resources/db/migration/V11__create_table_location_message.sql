CREATE TABLE tabtab.location_message (
     UserID int NOT NULL,
     LocationID int NOT NULL,
     LocationMessageID int NOT NULL AUTO_INCREMENT,
     Message varchar(1024) NOT NULL ,
     Timestamp TIMESTAMP NOT NULL ,
     PRIMARY KEY (LocationMessageID),
     KEY UserID (UserID),
     KEY LocationID (LocationID),
     CONSTRAINT location_message_ibfk_1 FOREIGN KEY (UserID) REFERENCES user (UserID),
     CONSTRAINT location_message_ibfk_2 FOREIGN KEY (LocationID) REFERENCES location (LocationID)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci