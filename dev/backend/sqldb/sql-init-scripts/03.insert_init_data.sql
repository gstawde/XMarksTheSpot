-- Insert initial data for 0 milestones
INSERT INTO MILESTONES(MILESTONE_ID, MILESTONE_NAME, MILESTONE_ICON, MILESTONE_POINTS) VALUES
	(0, "Game Created", "N/A", 0);

-- Insert initial data for user table
INSERT INTO USERS(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, USER_POINTS, MILESTONE_REACHED) VALUES
	("Sarah", "Lee", "sarahlee@gmail.com", "sarah123", "password", 500, 0);
INSERT INTO USERS(FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD_HASH, USER_POINTS, MILESTONE_REACHED) VALUES
	("David", "Lu", "david@gmail.com", "david01", "password", 1000, 0);