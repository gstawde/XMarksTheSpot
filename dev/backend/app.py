from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message
import mysql.connector
import os

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

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello World'
    })

from apis import user_apis, password_apis, gameplay_apis, question_apis, milestone_apis

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')




