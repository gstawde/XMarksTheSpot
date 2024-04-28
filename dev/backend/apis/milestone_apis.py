from flask import jsonify, request
from app import app, config
import mysql.connector

@app.route('/milestones', methods=['GET'])
def get_milestones():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
      
    cursor.execute("SELECT * FROM Milestones")
    users = cursor.fetchall()
      
    cursor.close()
    connection.close()
    
    return jsonify(users)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/milestone_reached', methods=['GET'])
def get_milestone_reached():
  try:
    user_id = request.args.get('userId')  
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("SELECT milestone_reached FROM Users WHERE user_id = %s", (user_id,))
    result = cursor.fetchone()
    
    cursor.close()
    connection.close()
    
    return jsonify(result)

  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})
  