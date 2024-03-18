from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import bcrypt
import os

app = Flask(__name__)
CORS(app)

config = {
  'user': 'root',
  'password': 'root',
  'host': 'xmts-db',
  'port': '3306',
  'database': 'x_marks_the_spot'
}

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello World'
    })

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
      return jsonify({'error': str(e)})

@app.route('/login', methods=['POST'])
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
      return jsonify({'success': True, 'message': 'Login successful'})
    else:
      return jsonify({'success': False, 'message': 'Invalid username or password.' })
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/add_user', methods=['POST'])
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
    
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    cursor.execute("INSERT INTO Users (FIRST_NAME, LAST_NAME, USERNAME, EMAIL, PASSWORD_HASH) VALUES (%s, %s, %s, %s, %s)", (first_name, last_name, username, email, password_hash))
    connection.commit()
    
    cursor.close()
    connection.close()
    return jsonify({'message': 'User added successfully',
                    'status': 200
                    })
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/check/username', methods=['POST'])
def checkUsername():
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
    return jsonify({'error': str(e)})

@app.route('/check/email', methods=['POST'])
def checkEmail():
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
    return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')