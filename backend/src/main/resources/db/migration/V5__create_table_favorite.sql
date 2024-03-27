CREATE TABLE tabtab.favorite (
    `UserID` int NOT NULL,
    `LocationID` int NOT NULL,
    `FavoriteID` int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`FavoriteID`),
    KEY `UserID` (`UserID`),
    KEY `LocationID` (`LocationID`),
    CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
    CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`LocationID`) REFERENCES `location` (`LocationID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci