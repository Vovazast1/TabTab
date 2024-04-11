CREATE TABLE tabtab.friend (
    UserID int NOT NULL,
    FriendUserID int NOT NULL,
    KEY FriendUserID (FriendUserID),
    KEY UserID (UserID),
    CONSTRAINT friend_ibfk_1 FOREIGN KEY (UserID) REFERENCES user (UserID),
    CONSTRAINT friend_ibfk_2 FOREIGN KEY (FriendUserID) REFERENCES user (UserID)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci