from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)
CORS(app)

with open('db.yaml', 'r') as file:
    db = yaml.load(file, Loader=yaml.FullLoader)
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/')
def home():
    return jsonify({
        'message' : 'Hello World'
    })

@app.route('/users', methods=['GET'])
def get_users():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Users")
        users = cur.fetchall()
        cur.close()
        return jsonify(users)
    except Exception as e:
        return jsonify({'error': str(e)})
    

# @app.route('/add_user', methods=['POST'])
# def add_user():
#     firstName =  request.args.get('FIRST_NAME')
#     lastName =  request.args.get('LAST_NAME')
#     username = request.args.get('USERNAME')
#     userData = get_users()
#     # If account already exists, send error status     
#     userData.append(user)
#     return jsonify({'message': 'User added successfully'}), 201
    
if __name__ == "__main__":
    app.run(debug=True)