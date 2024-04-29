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
	game_topic VARCHAR(255),
  user_score INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Questions (
  question_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  question VARCHAR(255) NOT NULL,
  question_format VARCHAR(20) NOT NULL,
  question_type VARCHAR(50) NOT NULL,
  question_level INT NOT NULL,
  answer_field VARCHAR(255),
  answer VARCHAR(255)
);

CREATE TABLE Countries (
  country_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country_name VARCHAR(100),
  flag VARCHAR(255),
  continent VARCHAR(50),
  capital VARCHAR(100),
	country_language VARCHAR(100),
  currency VARCHAR(100),
  equator VARCHAR(100), -- North or South
  prime_meridian VARCHAR(100), -- East or West
  climate VARCHAR(255),
  closest_ocean VARCHAR(100)
);