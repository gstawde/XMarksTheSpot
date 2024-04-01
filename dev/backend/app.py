from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message
import mysql.connector
import bcrypt
import jwt
import datetime
import os

SECRET_KEY = 'xmarksthespot'

app = Flask(__name__)
CORS(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = "xmarksthespotgame@gmail.com"
app.config['MAIL_PASSWORD'] = "vdug zbbq nzlk ahga"
mail = Mail(app)

config = {
  'user': 'root',
  'password': 'root',
  'host': 'xmts-db',
  'port': '3306',
  'database': 'x_marks_the_spot'
}

def send_password_reset_email(email, token):
  try:
    msg = Message('Password Reset Instructions', sender='xmarksthespotgame@gmail.com', recipients=[email])
    msg.body = f"Click the following link to reset your password: http://localhost:3000/reset-password?token={token}"
    mail.send(msg)  

    print(f"Password reset email sent successfully.")
    return True
  except Exception as e:
    print(f"Error sending password reset email.")
    return False

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

@app.route('/gameplays', methods=['GET'])
def get_gameplays():
    user_id = request.args.get('userid')
    print(user_id, flush=True)
    try:
      connection = mysql.connector.connect(**config)
      cursor = connection.cursor(dictionary=True)
      cursor.execute("SELECT * FROM Gameplays")
      gameplays = cursor.fetchall()
      
      cursor.close()
      connection.close()
      return jsonify(gameplays)
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

@app.route('/user/delete/<int:user_id>', methods=['DELETE'])
def delete_user():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Users WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    if user:
      cursor.execute("DELETE FROM Users WHERE id = %s", (user_id,))
      connection.commit()
      
      cursor.close()
      connection.close()

      return jsonify({'success': True, 'message': f'User with ID {user_id} deleted successfully.'})
    else:
      cursor.close()
      connection.close()

      return jsonify({'success': False, 'message': f'User with ID {user_id} does not exist.'})
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


# @app.route('/ranks', methods=['GET'])
# def get_ranks():
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

    

@app.route('/password/forgot', methods=['POST'])
def forgot_password():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    email = data.get('email')

    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
      token = jwt.encode({'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY, algorithm='HS256')
      
      cursor.close()
      connection.close()

      send_password_reset_email(email, token)

      return jsonify({'success': True, 'message': 'Password reset instructions sent successfully.', 'token': str(token)})
    else:
      cursor.close()
      connection.close()

      return jsonify({'success': False, 'message': 'User with provided email does not exist in our records.'})
      
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/password/reset', methods=['POST'])
def reset_password():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    token = data.get('token')
    password = data.get('password')
    
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    email =  decoded_token['email']

    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    cursor.execute("UPDATE Users SET password_hash = %s WHERE email = %s", (password_hash, email))
    connection.commit()
        
    cursor.close()
    connection.close()

    return jsonify({'success': True, 'message': f'Password reset successfully for account with email {email}!'})
  except Exception as e:
    return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')




