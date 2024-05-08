from flask import jsonify, request
from app import app, config
import mysql.connector
import bcrypt

def delete_user_gameplays(user_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Gameplays WHERE user_id = %s", (user_id,))
    gameplays = cursor.fetchall()  

    if gameplays:
      cursor.execute("DELETE FROM Gameplays WHERE user_id = %s", (user_id,))
      connection.commit()

    cursor.close()
    connection.close()

    return True
  except Exception as e:
    return False

@app.route('/api/users', methods=['GET'])
def get_users():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
      
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()
      
    cursor.close()
    connection.close()
    
    return jsonify(users)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})
  
@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM Users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()
      
    cursor.close()
    connection.close()
    
    return jsonify(user)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/users/login', methods=['POST'])
def login():
  try: 
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    cursor.execute("SELECT * FROM Users WHERE username = %s", (username,))
    user = cursor.fetchone()

    cursor.close()
    connection.close()
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
      return jsonify({'success': True, 'message': 'Login successful', 'result': user})
    else:
      return jsonify({'success': False, 'message': 'Invalid username or password.' })
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/users/add', methods=['POST'])
def add_user():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    cursor.execute("SELECT * FROM Users WHERE username = %s", (username,))
    existing_username = cursor.fetchone()
    if existing_username:
      return jsonify({'success': False, 'message': 'Account with provided username already exists.'})

    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
    existing_email = cursor.fetchone()
    if existing_email:
      return jsonify({'success': False, 'message': 'Account with provided email already exists.'})
    
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    cursor.execute("INSERT INTO Users (FIRST_NAME, LAST_NAME, USERNAME, EMAIL, USER_POINTS, PASSWORD_HASH) VALUES (%s, %s, %s, %s, %s, %s)", (first_name, last_name, username, email, 0, password_hash))
    connection.commit()
    
    cursor.close()
    connection.close()
    return jsonify({'success': True, 'message': 'User added successfully'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/users/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()

    if user and delete_user_gameplays(user_id):
      cursor.execute("DELETE FROM Users WHERE user_id = %s", (user_id,))
      connection.commit()
      
      cursor.close()
      connection.close()

      return jsonify({'success': True, 'message': f'User with ID {user_id} deleted successfully.'})
    else:
      cursor.close()
      connection.close()

      return jsonify({'success': False, 'message': f'User with ID {user_id} does not exist.'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/users/check/username', methods=['GET'])
def check_username():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    username = data.get('username')

    cursor.execute("SELECT * FROM Users WHERE username = %s", (username,))
    result = cursor.fetchone()
    
    cursor.close()
    connection.close()
    if result:
      return jsonify({'success': True, 'message': 'Username Exists', 'result': result, 'username': username})
    else:
      return jsonify({'success': False, 'message': 'Username does not exist.', 'result': result, 'username': username})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/users/check/email', methods=['GET'])
def check_email():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    email = data.get('email')
    
    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
    result = cursor.fetchone()
    
    cursor.close()
    connection.close()
    if result:
      return jsonify({'success': True, 'message': 'Email Exists'})
    else:
      return jsonify({'success': False, 'message': 'Email does not exist.'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})
  
@app.route('/api/user/points', methods=['GET'])
def user_points():
  try:
    user_id = request.args.get('userId')  

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT USER_POINTS FROM Users WHERE user_id = %s", (user_id,))
    user_points = cursor.fetchone()
      
    cursor.close()
    connection.close()
    
    return jsonify(user_points)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})
  
@app.route('/api/user/update/points', methods=['POST'])
def update_user_points():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
        
    data = request.get_json()
    user_id = data.get('user_id')
    points = data.get('user_points')

    cursor.execute("SELECT USER_POINTS FROM Users WHERE USER_ID = %s", (user_id,))
    result = cursor.fetchone()

    if result:
      current_points = result['USER_POINTS']
      new_points = current_points + points

      cursor.execute("UPDATE Users SET USER_POINTS = %s WHERE USER_ID = %s", (new_points, user_id))
      connection.commit()

      cursor.close()
      connection.close()

      return jsonify({'success': True, 'message': 'User points updated successfully', 'new_points': new_points})
    else:
      return jsonify({'error': 'User not found'})

  except Exception as e:
    return jsonify({'error': str(e)})


@app.route('/api/ranks', methods=['GET'])
def get_ranks():
  user_id = request.args.get('userId')
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT username, user_points FROM Users")
    userRanks = cursor.fetchall()
    top_three_users = userRanks[:3] if len(userRanks) >= 3 else userRanks

    cursor.execute("SELECT (SELECT COUNT(*) FROM Users WHERE user_points > (SELECT user_points FROM Users WHERE user_id = %s)) + 1 AS rank", (user_id,))
    user_rank = cursor.fetchone()['rank']

    cursor.close()
    connection.close()

    return jsonify({"top_three" : top_three_users, "rank_number" : user_rank})

  except Exception as e:
    return jsonify({'error': str(e)})
