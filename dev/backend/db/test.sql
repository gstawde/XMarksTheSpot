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

-- Insert initial data for gameplays
INSERT INTO Gameplays(game_date, game_finished, user_id, game_topic, user_score) VALUES 
	("2024-02-19 00:00:00", 1, 1, "Asia", 200);
INSERT INTO Gameplays(game_date, game_finished, user_id, game_topic, user_score) VALUES 
	("2024-02-21 00:00:00", 1, 3, "North America", 1000);

-- Country Information

-- North America
INSERT INTO COUNTRIES (COUNTRY_NAME, FLAG, CONTINENT, CAPITAL, COUNTRY_LANGUAGE, CURRENCY, EQUATOR, PRIME_MERIDIAN, CLIMATE, CLOSEST_OCEAN)
VALUES 
('United States', NULL, 'North America', 'Washington D.C.', 'English', 'US Dollar', 'North', 'West', NULL, 'Atlantic'),
('Canada', NULL, 'North America', 'Ottawa', 'French', 'Canadian Dollar', 'North', 'West', 'Snow', 'Atlantic'),
('Mexico', NULL, 'North America', 'Mexico City', 'Spanish', 'Mexican Peso', 'North', 'West', NULL, 'Pacific');

-- South America
INSERT INTO COUNTRIES (COUNTRY_NAME, FLAG, CONTINENT, CAPITAL, COUNTRY_LANGUAGE, CURRENCY, EQUATOR, PRIME_MERIDIAN, CLIMATE, CLOSEST_OCEAN)
VALUES 
('Brazil', NULL, 'South America', 'Brasília', 'Portuguese', 'Brazilian Real', 'South', 'East', 'Monsoon', 'Atlantic'),
('Argentina', NULL, 'South America', 'Buenos Aires', 'Spanish', 'Argentine Peso', 'South', 'West', 'Monsoon', 'Atlantic'),
('Colombia', NULL, 'South America', 'Bogotá', 'Spanish', 'Colombian Peso', 'North', 'West', 'Monsoon', 'Atlantic'),
('Peru', NULL, 'South America', 'Lima', 'Spanish', 'Peruvian Sol', 'South', 'West', 'Monsoon', 'Pacific'),
('Chile', NULL, 'South America', 'Santiago', 'Spanish', 'Chilean Peso', 'South', 'West', 'Monsoon', 'Pacific'),
('Ecuador', NULL, 'South America', 'Quito', 'Spanish', 'United States Dollar', 'South', 'West', 'Monsoon', 'Pacific'),
('Venezuela', NULL, 'South America', 'Caracas', 'Spanish', 'Venezuelan Bolívar', 'North', 'West', 'Monsoon', 'Atlantic');

-- Africa
INSERT INTO COUNTRIES (COUNTRY_NAME, FLAG, CONTINENT, CAPITAL, COUNTRY_LANGUAGE, CURRENCY, EQUATOR, PRIME_MERIDIAN, CLIMATE, CLOSEST_OCEAN)
VALUES 
('Egypt', NULL, 'Africa', 'Cairo', 'Arabic', 'Egyptian Pound', 'North', 'East', 'Desert', NULL),
('South Africa', NULL, 'Africa', 'Pretoria', 'Afrikaans', 'South African Rand', 'South', 'East', 'Monsoon', 'Indian'),
('Nigeria', NULL, 'Africa', 'Abuja', 'English', 'Nigerian Naira', 'North', 'East', 'Monsoon', 'Atlantic'),
('Kenya', NULL, 'Africa', 'Nairobi', 'Swahili', 'Kenyan Shilling', 'South', 'East', 'Monsoon', 'Indian'),
('Ethiopia', NULL, 'Africa', 'Addis Ababa', 'Amharic', 'Ethiopian Birr', 'North', 'East', 'Monsoon', 'Indian');
('Algeria', NULL, 'Africa', 'Algiers', 'Arabic', 'Algerian Dinar', 'North', 'East', 'Desert', 'Mediterranean'),
('Morocco', NULL, 'Africa', 'Rabat', 'Arabic, Berber', 'Moroccan Dirham', 'North', 'West', 'Desert', 'Atlantic'),
('Ghana', NULL, 'Africa', 'Accra', 'English', 'Ghanaian Cedi', 'North', 'West', 'Monsoon', 'Atlantic'),
('Uganda', NULL, 'Africa', 'Kampala', 'English, Swahili', 'Ugandan Shilling', 'North', 'East', 'Monsoon', 'Indian'),
('Tanzania', NULL, 'Africa', 'Dodoma', 'Swahili, English', 'Tanzanian Shilling', 'South', 'East', 'Monsoon', 'Indian');

-- Asia
INSERT INTO COUNTRIES (COUNTRY_NAME, FLAG, CONTINENT, CAPITAL, COUNTRY_LANGUAGE, CURRENCY, EQUATOR, PRIME_MERIDIAN, CLIMATE, CLOSEST_OCEAN)
VALUES 
('China', NULL, 'Asia', 'Beijing', 'Mandarin', 'Chinese Yuan', 'North', 'East', 'Monsoon', 'Pacific'),
('India', NULL, 'Asia', 'New Delhi', 'Hindi', 'Indian Rupee', 'North', 'East', 'Monsoon', 'Indian'),
('Japan', NULL, 'Asia', 'Tokyo', 'Japanese', 'Japanese Yen', 'North', 'East', 'Monsoon', 'Pacific'),
('South Korea', NULL, 'Asia', 'Seoul', 'Korean', 'South Korean Won', 'North', 'East', 'Monsoon', 'Pacific'),
('Saudi Arabia', NULL, 'Asia', 'Riyadh', 'Arabic', 'Saudi Riyal', 'North', 'East', 'Desert', 'Indian'),
('Thailand', NULL, 'Asia', 'Bangkok', 'Thai', 'Thai Baht', 'North', 'East', 'Monsoon', 'Pacific'),
('Vietnam', NULL, 'Asia', 'Hanoi', 'Vietnamese', 'Vietnamese Dong', 'North', 'East', 'Monsoon', 'Pacific'),
('Pakistan', NULL, 'Asia', 'Islamabad', 'Urdu,', 'Pakistani Rupee', 'North', 'East', 'Monsoon', 'Indian'),
('Indonesia', NULL, 'Asia', 'Jakarta', 'Indonesian', 'Indonesian Rupiah', 'South', 'East', 'Monsoon', 'Indian'),
('Philippines', NULL, 'Asia', 'Manila', 'Filipino', 'Philippine Peso', 'North', 'East', 'Monsoon', 'Pacific'),
('Singapore', NULL, 'Asia', 'Singapore', 'English, Malay, Mandarin, Tamil', 'Singapore Dollar', 'North', 'East', 'Monsoon', 'Pacific'),
('Bangladesh', NULL, 'Asia', 'Dhaka', 'Bengali', 'Bangladeshi Taka', 'North', 'East', 'Monsoon', 'Indian'),
('Malaysia', NULL, 'Asia', 'Kuala Lumpur', 'Malay', 'Malaysian Ringgit', 'North', 'East', 'Monsoon', 'Pacific'),
('Sri Lanka', NULL, 'Asia', 'Colombo', 'Sinhala & Tamil', 'Sri Lankan Rupee', 'North', 'East', 'Monsoon', 'Indian'),
('Myanmar', NULL, 'Asia', 'Naypyidaw', 'Burmese', 'Burmese Kyat', 'North', 'East', 'Monsoon', 'Indian');

-- Europe
INSERT INTO COUNTRIES (COUNTRY_NAME, FLAG, CONTINENT, CAPITAL, COUNTRY_LANGUAGE, CURRENCY, EQUATOR, PRIME_MERIDIAN, CLIMATE, CLOSEST_OCEAN)
VALUES 
('Russia', NULL, 'Europe', 'Moscow', 'Russian', 'Russian Ruble', 'North', 'East', 'Snow', 'Arctic'),
('France', NULL, 'Europe', 'Paris', 'French', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('United Kingdom', NULL, 'Europe', 'London', 'English', 'British Pound', 'North', 'West', NULL, 'Atlantic'),
('Italy', NULL, 'Europe', 'Rome', 'Italian', 'Euro', 'North', 'East', NULL, 'Mediterranean');
('Germany', NULL, 'Europe', 'Berlin', 'German', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('Spain', NULL, 'Europe', 'Madrid', 'Spanish', 'Euro', 'North', 'West', NULL, 'Atlantic'),
('Netherlands', NULL, 'Europe', 'Amsterdam', 'Dutch', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('Switzerland', NULL, 'Europe', 'Bern', 'German, French, Italian, Romansh', 'Swiss Franc', 'North', 'East', NULL, 'Atlantic'),

-- Insert MC Questions
INSERT INTO QUESTIONS (QUESTION_ID, QUESTION, QUESTION_TYPE, QUESTION_LEVEL, ANSWER) VALUES
(1, 'What country does this flag belong to?', 'Identification', 1, NULL),
(2, 'What is the capital of this country?', 'Fact Retrieval', 1, NULL),
(3, 'What is the official language spoken in this country?', 'Fact Retrieval', 1, NULL),
(4, 'What is the official currency of this country?', 'Fact Retrieval', 1, NULL),
(5, 'Which of the following countries is located below the equator?', 'Geographical', 2, NULL),
(6, 'Which of the following countries is located above the equator?', 'Geographical', 2, NULL),
(7, 'Which of the following countries is located west of the Prime Meridian?', 'Geographical', 2, NULL),
(8, 'Which of the following countries is located east of the Prime Meridian?', 'Geographical', 2, NULL),
(9, 'Which of the following countries experiences a monsoon season?', 'Climate', 3, NULL),
(10, 'Which of the following countries snows in the winter?', 'Climate', 3, NULL),
(11, 'Which of the following countries has a desert in it?', 'Geographical', 3, NULL),
(12, 'Which of the following countries have shorelines/are located next to an ocean?', 'Geographical', 3, NULL);


