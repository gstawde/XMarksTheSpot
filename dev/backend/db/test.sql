CREATE SCHEMA IF NOT EXISTS x_marks_the_spot;

USE x_marks_the_spot;

CREATE TABLE Milestones(
	milestone_id INT PRIMARY KEY NOT NULL UNIQUE,
	milestone_name VARCHAR(255) NOT NULL,
	milestone_icon VARCHAR(255) NOT NULL,
  milestone_points INT NOT NULL
);

CREATE TABLE Users(
	user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255),
	last_name VARCHAR(255),
	email VARCHAR(255) NOT NULL UNIQUE,
	username VARCHAR(255) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
  user_points INT,
  milestone_reached INT DEFAULT 0,
	FOREIGN KEY (milestone_reached) REFERENCES Milestones(milestone_id)

);

CREATE TABLE Gameplays(
	game_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
  game_date DATETIME NOT NULL,
  game_finished TINYINT,
  user_id INT NOT NULL,
	game_topic VARCHAR(255) NOT NULL,
  user_score INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert initial data for 0 milestones
INSERT INTO Milestones(milestone_id, milestone_name, milestone_icon, milestone_points) VALUES
	(0, "Game Created", "N/A", 0);

-- Insert initial data for user table
INSERT INTO Users(first_name, last_name, email, username, password_hash, user_points, milestone_reached) VALUES
	("Sarah", "Lee", "sarahlee@gmail.com", "sarah123", "password", 500, 0);
INSERT INTO Users(first_name, last_name, email, username, password_hash, user_points, milestone_reached) VALUES
	("David", "Lu", "david@gmail.com", "david01", "password", 1000, 0);