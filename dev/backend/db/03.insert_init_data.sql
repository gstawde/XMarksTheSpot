USE fahmed$default;

-- Insert initial data for 0 milestones
INSERT INTO Milestones(milestone_id, milestone_name, milestone_icon, milestone_points) VALUES
	(0, "Game Created", "N/A", 0);

-- Insert milestones
INSERT INTO Milestones(milestone_id, milestone_name, milestone_icon, milestone_points) VALUES
	(1, "France", "milestones/france.png", 100),
	(2, "India", "milestones/india.png", 5000),
	(3, "South Africa", "milestones/south-africa.png", 10000),
	(4, "Japan", "milestones/japan.png", 15000),
	(5, "USA", "milestones/usa.png", 20000),
	(6, "Peru", "milestones/peru.png", 25000),
	(8, "Sweden", "milestones/sweden.png", 30000),
	(9, "Qatar", "milestones/qatar.png", 35000),
	(10, "Sweden", "milestones/sweden.png", 40000),
	(11, "Mexico", "milestones/mexico.png", 45000),
	(12, "Panama", "milestones/panama.png", 50000),
	(13, "Sri Lanka", "milestones/sri-lanka.png", 55000),
	(14, "Pakistan", "milestones/pakistan.png", 60000),
	(15, "Spain", "milestones/spain.png", 65000);

-- Insert initial data for user table
INSERT INTO Users(first_name, last_name, email, username, password_hash, user_points, milestone_reached) VALUES
	("Sarah", "Lee", "sarahlee@gmail.com", "sarah123", "password", 500, 0);
INSERT INTO Users(first_name, last_name, email, username, password_hash, user_points, milestone_reached) VALUES
	("David", "Lu", "david@gmail.com", "david01", "password", 1000, 0);

-- Insert initial data for gameplays
INSERT INTO Gameplays(game_id, game_date, game_in_progress, game_finished, user_id, host, game_topic, user_score) VALUES
	(1, '2024-02-19 00:00:00', 0, 1, 1, 1, 'Asia', 200);
INSERT INTO Gameplays(game_id, game_date, game_in_progress, game_finished, user_id, host, game_topic, user_score) VALUES
	(1, '2024-02-21 00:00:00', 0, 1, 2, 1, 'North America', 1000);

-- Country Information

-- North America
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES
('United States', 'country_flags/usa.png', 'North America', 'Washington D.C.', 'English', 'US Dollar', 'North', 'West', NULL, 'Atlantic'),
('Canada', 'country_flags/canada.png', 'North America', 'Ottawa', 'French', 'Canadian Dollar', 'North', 'West', 'Snow', 'Atlantic'),
('Mexico', 'country_flags/mexico.png', 'North America', 'Mexico City', 'Spanish', 'Mexican Peso', 'North', 'West', NULL, 'Pacific');

-- South America
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES
('Brazil', 'country_flags/brazil.png', 'South America', 'Brasília', 'Portuguese', 'Brazilian Real', 'South', 'East', 'Monsoon', 'Atlantic'),
('Argentina', 'country_flags/argentina.png', 'South America', 'Buenos Aires', 'Spanish', 'Argentine Peso', 'South', 'West', 'Monsoon', 'Atlantic'),
('Colombia', 'country_flags/colombia.png', 'South America', 'Bogotá', 'Spanish', 'Colombian Peso', 'North', 'West', 'Monsoon', 'Atlantic'),
('Peru', 'country_flags/peru.png', 'South America', 'Lima', 'Spanish', 'Peruvian Sol', 'South', 'West', 'Monsoon', 'Pacific'),
('Chile', 'country_flags/chile.png', 'South America', 'Santiago', 'Spanish', 'Chilean Peso', 'South', 'West', 'Monsoon', 'Pacific'),
('Ecuador', 'country_flags/ecuador.png', 'South America', 'Quito', 'Spanish', 'United States Dollar', 'South', 'West', 'Monsoon', 'Pacific'),
('Venezuela', 'country_flags/venezuela.png', 'South America', 'Caracas', 'Spanish', 'Venezuelan Bolívar', 'North', 'West', 'Monsoon', 'Atlantic');

-- Africa
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES
('Egypt', 'country_flags/egypt.png', 'Africa', 'Cairo', 'Arabic', 'Egyptian Pound', 'North', 'East', 'Desert', NULL),
('South Africa', 'country_flags/south_africa.png', 'Africa', 'Pretoria', 'Afrikaans', 'South African Rand', 'South', 'East', 'Monsoon', 'Indian'),
('Nigeria', 'country_flags/nigeria.png', 'Africa', 'Abuja', 'English', 'Nigerian Naira', 'North', 'East', 'Monsoon', 'Atlantic'),
('Kenya', 'country_flags/kenya.png', 'Africa', 'Nairobi', 'Swahili', 'Kenyan Shilling', 'South', 'East', 'Monsoon', 'Indian'),
('Ethiopia', 'country_flags/ethiopia.png', 'Africa', 'Addis Ababa', 'Amharic', 'Ethiopian Birr', 'North', 'East', 'Monsoon', 'Indian'),
('Algeria', 'country_flags/algeria.png', 'Africa', 'Algiers', 'Arabic', 'Algerian Dinar', 'North', 'East', 'Desert', 'Mediterranean'),
('Morocco', 'country_flags/morocco.png', 'Africa', 'Rabat', 'Arabic, Berber', 'Moroccan Dirham', 'North', 'West', 'Desert', 'Atlantic'),
('Ghana', 'country_flags/ghana.png', 'Africa', 'Accra', 'English', 'Ghanaian Cedi', 'North', 'West', 'Monsoon', 'Atlantic'),
('Uganda', 'country_flags/uganda.png', 'Africa', 'Kampala', 'English, Swahili', 'Ugandan Shilling', 'North', 'East', 'Monsoon', 'Indian'),
('Tanzania', 'country_flags/tanzania.png', 'Africa', 'Dodoma', 'Swahili, English', 'Tanzanian Shilling', 'South', 'East', 'Monsoon', 'Indian');

-- Asia
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES
('China', 'country_flags/china.png', 'Asia', 'Beijing', 'Mandarin', 'Chinese Yuan', 'North', 'East', 'Monsoon', 'Pacific'),
('India', 'country_flags/india.png', 'Asia', 'New Delhi', 'Hindi', 'Indian Rupee', 'North', 'East', 'Monsoon', 'Indian'),
('Japan', 'country_flags/japan.png', 'Asia', 'Tokyo', 'Japanese', 'Japanese Yen', 'North', 'East', 'Monsoon', 'Pacific'),
('South Korea', 'country_flags/south_korea.png', 'Asia', 'Seoul', 'Korean', 'South Korean Won', 'North', 'East', 'Monsoon', 'Pacific'),
('Saudi Arabia', 'country_flags/saudi_arabia.png', 'Asia', 'Riyadh', 'Arabic', 'Saudi Riyal', 'North', 'East', 'Desert', 'Indian'),
('Thailand', 'country_flags/thailand.png', 'Asia', 'Bangkok', 'Thai', 'Thai Baht', 'North', 'East', 'Monsoon', 'Pacific'),
('Vietnam', 'country_flags/vietnam.png', 'Asia', 'Hanoi', 'Vietnamese', 'Vietnamese Dong', 'North', 'East', 'Monsoon', 'Pacific'),
('Pakistan', 'country_flags/pakistan.png', 'Asia', 'Islamabad', 'Urdu', 'Pakistani Rupee', 'North', 'East', 'Monsoon', 'Indian'),
('Indonesia', 'country_flags/indonesia.png', 'Asia', 'Jakarta', 'Indonesian', 'Indonesian Rupiah', 'South', 'East', 'Monsoon', 'Indian'),
('Philippines', 'country_flags/philippines.png', 'Asia', 'Manila', 'Filipino', 'Philippine Peso', 'North', 'East', 'Monsoon', 'Pacific'),
('Singapore', 'country_flags/singapore.png', 'Asia', 'Singapore', 'English, Malay, Mandarin, Tamil', 'Singapore Dollar', 'North', 'East', 'Monsoon', 'Pacific'),
('Bangladesh', 'country_flags/bangladesh.png', 'Asia', 'Dhaka', 'Bengali', 'Bangladeshi Taka', 'North', 'East', 'Monsoon', 'Indian'),
('Malaysia', 'country_flags/malaysia.png', 'Asia', 'Kuala Lumpur', 'Malay', 'Malaysian Ringgit', 'North', 'East', 'Monsoon', 'Pacific'),
('Sri Lanka', 'country_flags/sri_lanka.png', 'Asia', 'Colombo', 'Sinhala & Tamil', 'Sri Lankan Rupee', 'North', 'East', 'Monsoon', 'Indian'),
('Myanmar', 'country_flags/myanmar.png', 'Asia', 'Naypyidaw', 'Burmese', 'Burmese Kyat', 'North', 'East', 'Monsoon', 'Indian');

-- Europe
INSERT INTO Countries(country_name, flag, continent, capital, country_language, currency, equator, prime_meridian, climate, closest_ocean)
VALUES
('Russia', 'country_flags/russia.png', 'Europe', 'Moscow', 'Russian', 'Russian Ruble', 'North', 'East', 'Snow', 'Arctic'),
('France', 'country_flags/france.png', 'Europe', 'Paris', 'French', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('United Kingdom', 'country_flags/uk.png', 'Europe', 'London', 'English', 'British Pound', 'North', 'West', NULL, 'Atlantic'),
('Italy', 'country_flags/italy.png', 'Europe', 'Rome', 'Italian', 'Euro', 'North', 'East', NULL, 'Mediterranean'),
('Germany', 'country_flags/germany.png', 'Europe', 'Berlin', 'German', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('Spain', 'country_flags/spain.png', 'Europe', 'Madrid', 'Spanish', 'Euro', 'North', 'West', NULL, 'Atlantic'),
('Netherlands', 'country_flags/netherlands.png', 'Europe', 'Amsterdam', 'Dutch', 'Euro', 'North', 'East', NULL, 'Atlantic'),
('Switzerland', 'country_flags/switzerland.png', 'Europe', 'Bern', 'German, French, Italian, Romansh', 'Swiss Franc', 'North', 'East', NULL, 'Atlantic'),
('Sweden', 'country_flags/sweden.png', 'Europe', 'Stockholm', 'Swedish', 'Swedish Krona', 'North', 'East', NULL, 'Atlantic');

-- Insert MC Questions
INSERT INTO Questions(question_id, question, question_format, question_type, question_level, answer_field, answer) VALUES
(1, 'What country does this flag belong to?', 'General', 'Identification', 1, "flag", NULL),
(2, 'What is the capital of this country?', 'General','Fact Retrieval', 1, "capital", NULL),
(3, 'What is the official language spoken in this country?', 'General', 'Fact Retrieval', 1, "country_language", NULL),
(4, 'What is the official currency of this country?', 'General', 'Fact Retrieval', 1, "currency", NULL),
(5, 'Which country out of the following is located below the equator?', 'General', 'Geographical', 2, "equator", "South"),
(6, 'Which country out of the following is located above the equator?', 'General', 'Geographical', 2, "equator", "North"),
(7, 'Which country out of the following is located west of the Prime Meridian?', 'General', 'Geographical', 2, "prime_meridian", "West"),
(8, 'Which country out of the following is located east of the Prime Meridian?', 'General', 'Geographical', 2, "prime_meridian", "East"),
(9, 'Which country out of the following experiences a monsoon season?', 'General', 'Climate', 3, "climate", "Monsoon"),
(10, 'Which country out of the following snows in the winter?', 'General', 'Climate', 3, "climate", "Snow"),
(11, 'Which country out of the following has a desert in it?', 'General', 'Climate', 3, "climate", "Desert"),
(12, 'The flag of X is:', 'TF', 'Identification', 1, 'flag', NULL),
(13, 'The capital of X is Y.', 'TF', 'Fact Retrieval', 1, 'capital', NULL),
(14, 'The currency of X is Y.', 'TF', 'Fact Retrieval', 1, 'currency', NULL),
(15, 'X is located in the Northern hemisphere.','TF','Geographical', 2, 'equator', 'North'),
(16, 'X is located in the Southern hemisphere.','TF','Geographical', 2, 'equator', 'South'),
(17, 'X is located west of the prime meridian.', 'TF', 'Geographical', 2, 'prime_meridian', 'West'),
(18, 'X is located east of the prime meridian.', 'TF', 'Geographical', 2, 'prime_meridian', 'East');