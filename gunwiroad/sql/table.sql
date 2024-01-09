CREATE TABLE `users` (
	`user_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_email` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_password` VARCHAR(1000) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_name` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_image` VARCHAR(1000) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_provider` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`user_id`) USING BTREE,
	UNIQUE INDEX `user_email` (`user_email`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `users` (
	`user_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_email` VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_password` VARCHAR(1000) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_name` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_image` VARCHAR(1000) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`user_provider` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`user_id`) USING BTREE,
	UNIQUE INDEX `user_email` (`user_email`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


CREATE TABLE `users_course` (
	`users_course_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL DEFAULT '0',
	`course_id` INT(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`users_course_id`),
	INDEX `user_id` (`user_id`),
	INDEX `course_id` (`course_id`),
	CONSTRAINT `FK_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
;
