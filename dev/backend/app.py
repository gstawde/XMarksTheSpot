from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello World'
    })

@app.route('/users', methods=['GET'])
def get_users():
    try:
      config={
        'user': 'root',
        'password': 'root',
        'host': 'xmts-db',
        'port': '3306',
        'database': 'x_marks_the_spot'
      }
      
      connection = mysql.connector.connect(**config)

      cursor = connection.cursor(dictionary=True)
      cursor.execute("SELECT * FROM USERS")
      users = cursor.fetchall()
      cursor.close()
      connection.close()
      return jsonify(users)
    except Exception as e:
      return jsonify({'error': str(e)})

# Example of adding a user, you can uncomment and customize this route as needed.
# @app.route('/add_user', methods=['POST'])
# def add_user():
#     try:
#         firstName = request.args.get('FIRST_NAME')
#         lastName = request.args.get('LAST_NAME')
#         username = request.args.get('USERNAME')
#         connection = mysql.connector.connect(
#             host=db['mysql_host'],
#             user=db['mysql_user'],
#             password=db['mysql_password'],
#             database=db['mysql_db']
#         )
#         cursor = connection.cursor()
#         cursor.execute("INSERT INTO Users (FIRST_NAME, LAST_NAME, USERNAME) VALUES (%s, %s, %s)", (firstName, lastName, username))
#         connection.commit()
#         cursor.close()
#         connection.close()
#         return jsonify({'message': 'User added successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')