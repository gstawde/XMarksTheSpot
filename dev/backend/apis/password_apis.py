from flask import jsonify, request
from flask_mail import Mail, Message
from app import app, config, mail
from datetime import datetime, timedelta
import mysql.connector
import bcrypt
import jwt

SECRET_KEY = 'xmarksthespot'

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

@app.route('/password/forgot', methods=['POST'])
def forgot_password():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    email = data.get('email')

    cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
      token = jwt.encode({'email': email, 'exp': datetime.utcnow() + timedelta(hours=1)}, SECRET_KEY, algorithm='HS256')
      
      send_password_reset_email(email, token)

      return jsonify({'success': True, 'message': 'Password reset instructions sent successfully.'})
    else:
      return jsonify({'success': False, 'message': 'User with provided email does not exist in our records.'})
      
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

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
    return jsonify({'success': False, 'error': str(e)})
