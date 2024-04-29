from flask import jsonify, request
from app import app, config
import mysql.connector
import bcrypt

@app.route('/users', methods=['GET'])
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
  
@app.route('/user', methods=['GET'])
def get_user():
  try:
    user_id = request.args.get('userId')  
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM Users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()
      
    cursor.close()
    connection.close()
    
    return jsonify(user)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/users/login', methods=['POST'])
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

@app.route('/users/add', methods=['POST'])
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
    
    cursor.execute("INSERT INTO Users (FIRST_NAME, LAST_NAME, USERNAME, EMAIL, PASSWORD_HASH) VALUES (%s, %s, %s, %s, %s)", (first_name, last_name, username, email, password_hash))
    connection.commit()
    
    cursor.close()
    connection.close()
    return jsonify({'success': True, 'message': 'User added successfully'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/users/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
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

@app.route('/users/check/username', methods=['GET'])
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

@app.route('/users/check/email', methods=['GET'])
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

@app.route('/users/ranks', methods=['GET'])
def get_ranks():
#   user_id = request.args.get('userid')
#   try:
#     connection = mysql.connector.connect(**config)
#     cursor = connection.cursor(dictionary=True)
    
#     cursor.execute("SELECT * FROM Users")
#     users = cursor.fetchall()
   
#     cursor.close()
#     connection.close()

#     return jsonify({'ranks': users, 'r': '12'})

#   except Exception as e:
#     return jsonify({'error': str(e)})
    return jsonify({'message': 'In progress!'})
