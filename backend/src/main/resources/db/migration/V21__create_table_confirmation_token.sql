CREATE TABLE tabtab.confirmation_token (
   `TokenID` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
   `confirmation_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
   `created_date` DATE NOT NULL,
   `userid` int NOT NULL,
   PRIMARY KEY (`TokenID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci