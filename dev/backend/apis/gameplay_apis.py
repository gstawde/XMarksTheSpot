from datetime import datetime as dt
from flask import jsonify, request
from app import app, config
import mysql.connector

@app.route('/gameplays', methods=['GET'])
def get_gameplays():
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

@app.route('/user_gameplays', methods=['GET'])
def get_user_gameplays():
    try:
        user_id = request.args.get('userId')  
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Gameplays WHERE user_id = %s", (user_id,))
        gameplays = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(gameplays)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/game/start', methods=['POST'])
def start_game():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    game_id = data.get('game_id')
    game_date = dt.now().strftime('%Y-%m-%d %H:%M:%S')  # Convert datetime to string
    user_id = data.get('user_id')
    game_topic = data.get('game_topic')

    cursor.execute("INSERT INTO Gameplays (GAME_ID, GAME_DATE, GAME_FINISHED, USER_ID, GAME_TOPIC, USER_SCORE) VALUES (%s, %s, %s, %s, %s, %s)", (game_id, game_date, 0, user_id, game_topic, 0))
    connection.commit()
    
    cursor.close()
    connection.close()
    return jsonify({'success': True, 'message': 'New game created added successfully'})
  except Exception as e:
    return jsonify({'error': str(e)})
  

@app.route('/update_score', methods=['POST'])
def update_user_score():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
        
    data = request.get_json()
    new_score = data.get('new_score') 
    game_id = data.get('game_id')
    user_id = data.get('user_id')

    cursor.execute("UPDATE Gameplays SET USER_SCORE = %s WHERE GAME_ID = %s AND USER_ID = %s", (new_score, game_id, user_id))
    connection.commit()
        
    cursor.close()
    connection.close()
    return jsonify({'success': True, 'message': 'User score updated successfully'})
  except Exception as e:
      return jsonify({'error': str(e)})
  
@app.route('/game_top_score', methods=['GET'])
def get_top_score():
  try:
    game_id = request.args.get('gameId')  
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
        
    cursor.execute("SELECT USER_ID, USER_SCORE FROM Gameplays WHERE GAME_ID = %s", (game_id,))
    game_scores = cursor.fetchall()
        
    top_score = 0
    top_user = None
    for score_data in game_scores:
      if score_data['USER_SCORE'] >= top_score:
        top_score = score_data['USER_SCORE']
        top_user = score_data['USER_ID']
        
    cursor.close()
    connection.close()

    return jsonify({'success': True, 'top_user_id': top_user, 'top_score': top_score})

        
    # if top_user is not None:
    #   return jsonify({'success': True, 'top_user_id': top_user_id, 'top_score': top_score})
    # else:
    #   return jsonify({'success': False, 'message': 'No users found for the specified game'})
    
  except Exception as e:
    return jsonify({'error': str(e)})