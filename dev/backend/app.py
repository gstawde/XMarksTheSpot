from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import mysql.connector
import os

app = Flask(__name__)
CORS(app, origins=['http://fahmed.pythonanywhere.com'])

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = "xmarksthespotgame@gmail.com"
app.config['MAIL_PASSWORD'] = "vdug zbbq nzlk ahga"
mail = Mail(app)

# MySQL database connection settings
config = {
    'user': 'fahmed',
    'password': 'xmarksthespot',
    'host': 'fahmed.mysql.pythonanywhere-services.com',
    'port': '3306',
    'database': 'fahmed$default'
}

def run_sql_script(filename):
    """
    Run SQL script.
    """
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()

        with open(filename, 'r') as f:
            sql_script = f.read()
            cursor.execute(sql_script, multi=True)
            connection.commit()

    except mysql.connector.Error as error:
        print("Error running SQL script:", error)

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Serve static files from the build directory
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../frontend/build', 'index.html')


from apis import user_apis, password_apis, gameplay_apis, question_apis, milestone_apis, quiz_apis

if __name__ == "__main__":
    # Run SQL scripts
    scripts_path = os.path.join(os.path.dirname(__file__), 'db')
    for filename in os.listdir(scripts_path):
        if filename.endswith('.sql'):
            script_file = os.path.join(scripts_path, filename)
            run_sql_script(script_file)

    # Start Flask application
    app.run(debug=True, host='0.0.0.0', port=4000)