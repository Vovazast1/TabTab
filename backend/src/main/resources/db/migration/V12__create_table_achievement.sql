CREATE TABLE tabtab.achievement (
         UserID int NOT NULL,
         AchievementID int NOT NULL AUTO_INCREMENT,
         PRIMARY KEY (AchievementID),
         KEY UserID (UserID),
         CONSTRAINT achievement_ibfk_1 FOREIGN KEY (UserID) REFERENCES user (UserID)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci