-- Insert initial data for 0 milestones
INSERT INTO MILESTONES(MILESTONE_ID, MILESTONE_NAME, MILESTONE_ICON, MILESTONE_POINTS) VALUES
	(0, "Game Created", "N/A", 0);

-- Insert initial data for user table
INSERT INTO USERS(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, USER_POINTS, MILESTONE_REACHED) VALUES
	("Sarah", "Lee", "sarahlee@gmail.com", "sarah123", "password", 500, 0);
INSERT INTO USERS(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, USER_POINTS, MILESTONE_REACHED) VALUES
	("David", "Lu", "david@gmail.com", "david01", "password", 1000, 0);

-- Insert initial data for gameplays
INSERT INTO Gameplays(game_date, game_finished, user_id, game_topic, user_score) VALUES 
	("2024-02-19 00:00:00", 1, 1, "Asia", 200);

