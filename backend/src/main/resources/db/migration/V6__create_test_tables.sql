CREATE TABLE tabtab.roles (
    `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `name` varchar(60) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE tabtab.users (
    `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `email` varchar(255) DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `username` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE tabtab.user_roles (
    user_id BIGINT NOT NULL COMMENT 'Foreign Key',
    role_id BIGINT NOT NULL COMMENT 'Foreign Key',
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);