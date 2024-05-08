from flask import jsonify, request
from app import app, config
import mysql.connector

@app.route('/api/milestones', methods=['GET'])
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

@app.route('/api/milestone/reached', methods=['GET'])
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

@app.route('/api/milestone/update', methods=['POST'])
def update_user_milestone():
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(dictionary=True)
        
        data = request.get_json()
        user_id = data.get('user_id')

        cursor.execute("SELECT USER_POINTS, MILESTONE_REACHED FROM Users WHERE USER_ID = %s", (user_id,))
        result = cursor.fetchone()

        if result:
            milestone_id = (result["MILESTONE_REACHED"] + 1)
            cursor.execute("SELECT * FROM Milestones WHERE MILESTONE_ID = %s", (milestone_id,))
            milestone = cursor.fetchone()

            if milestone and milestone["milestone_points"] <= result["USER_POINTS"]:
                cursor.execute("UPDATE Users SET milestone_reached = %s WHERE USER_ID = %s", (milestone_id, user_id))
                connection.commit()
                cursor.close()
                connection.close()
                return jsonify({'success': True, 'message': 'Milestone changed', 'new_milestone': milestone_id})
            else: 
                cursor.close()
                connection.close()
                return jsonify({'success': True, 'message': 'Milestone stayed the same'})
        else:
            return jsonify({'success': False, 'error': 'User not found'})   

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
  