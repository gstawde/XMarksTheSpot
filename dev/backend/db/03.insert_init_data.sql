USE x_marks_the_spot;

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
	("2024-02-21 00:00:00", 1, 2, "North America", 1000);

-- Country Information

-- North America
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES 
('United States', NULL, 'North America', 'Washington D.C.', 'English', 'US Dollar', 'North', 'West', NULL, 'Atlantic'),
('Canada', NULL, 'North America', 'Ottawa', 'French', 'Canadian Dollar', 'North', 'West', 'Snow', 'Atlantic'),
('Mexico', NULL, 'North America', 'Mexico City', 'Spanish', 'Mexican Peso', 'North', 'West', NULL, 'Pacific');

-- South America
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES 
('Brazil', NULL, 'South America', 'Brasília', 'Portuguese', 'Brazilian Real', 'South', 'East', 'Monsoon', 'Atlantic'),
('Argentina', NULL, 'South America', 'Buenos Aires', 'Spanish', 'Argentine Peso', 'South', 'West', 'Monsoon', 'Atlantic'),
('Colombia', NULL, 'South America', 'Bogotá', 'Spanish', 'Colombian Peso', 'North', 'West', 'Monsoon', 'Atlantic'),
('Peru', NULL, 'South America', 'Lima', 'Spanish', 'Peruvian Sol', 'South', 'West', 'Monsoon', 'Pacific'),
('Chile', NULL, 'South America', 'Santiago', 'Spanish', 'Chilean Peso', 'South', 'West', 'Monsoon', 'Pacific'),
('Ecuador', NULL, 'South America', 'Quito', 'Spanish', 'United States Dollar', 'South', 'West', 'Monsoon', 'Pacific'),
('Venezuela', NULL, 'South America', 'Caracas', 'Spanish', 'Venezuelan Bolívar', 'North', 'West', 'Monsoon', 'Atlantic');

-- Africa
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES 
('Egypt', NULL, 'Africa', 'Cairo', 'Arabic', 'Egyptian Pound', 'North', 'East', 'Desert', NULL),
('South Africa', NULL, 'Africa', 'Pretoria', 'Afrikaans', 'South African Rand', 'South', 'East', 'Monsoon', 'Indian'),
('Nigeria', NULL, 'Africa', 'Abuja', 'English', 'Nigerian Naira', 'North', 'East', 'Monsoon', 'Atlantic'),
('Kenya', NULL, 'Africa', 'Nairobi', 'Swahili', 'Kenyan Shilling', 'South', 'East', 'Monsoon', 'Indian'),
('Ethiopia', NULL, 'Africa', 'Addis Ababa', 'Amharic', 'Ethiopian Birr', 'North', 'East', 'Monsoon', 'Indian'),
('Algeria', NULL, 'Africa', 'Algiers', 'Arabic', 'Algerian Dinar', 'North', 'East', 'Desert', 'Mediterranean'),
('Morocco', NULL, 'Africa', 'Rabat', 'Arabic, Berber', 'Moroccan Dirham', 'North', 'West', 'Desert', 'Atlantic'),
('Ghana', NULL, 'Africa', 'Accra', 'English', 'Ghanaian Cedi', 'North', 'West', 'Monsoon', 'Atlantic'),
('Uganda', NULL, 'Africa', 'Kampala', 'English, Swahili', 'Ugandan Shilling', 'North', 'East', 'Monsoon', 'Indian'),
('Tanzania', NULL, 'Africa', 'Dodoma', 'Swahili, English', 'Tanzanian Shilling', 'South', 'East', 'Monsoon', 'Indian');

-- Asia
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
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
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES 
('Russia', NULL, 'Europe', 'Moscow', 'Russian', 'Russian Ruble', 'North', 'East', 'Snow', 'Arctic'),
('France', NULL, 'Europe', 'Paris', 'French', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('United Kingdom', NULL, 'Europe', 'London', 'English', 'British Pound', 'North', 'West', NULL, 'Atlantic'),
('Italy', NULL, 'Europe', 'Rome', 'Italian', 'Euro', 'North', 'East', NULL, 'Mediterranean'),
('Germany', NULL, 'Europe', 'Berlin', 'German', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('Spain', NULL, 'Europe', 'Madrid', 'Spanish', 'Euro', 'North', 'West', NULL, 'Atlantic'),
('Netherlands', NULL, 'Europe', 'Amsterdam', 'Dutch', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('Switzerland', NULL, 'Europe', 'Bern', 'German, French, Italian, Romansh', 'Swiss Franc', 'North', 'East', NULL, 'Atlantic'),
('Sweden', NULL, 'Europe', 'Stockholm', 'Swedish', 'Swedish Krona', 'North', 'East', NULL, 'Atlantic');

-- Insert MC Questions 
INSERT INTO Questions(question_id, question, question_type, question_level, answer) VALUES
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