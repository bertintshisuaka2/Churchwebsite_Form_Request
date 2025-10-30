CREATE TABLE `activity_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`user_name` varchar(255),
	`action_type` enum('status_change','delete','restore','permanent_delete','create') NOT NULL,
	`submission_id` int NOT NULL,
	`submission_name` varchar(255),
	`old_value` text,
	`new_value` text,
	`details` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_logs_id` PRIMARY KEY(`id`)
);
