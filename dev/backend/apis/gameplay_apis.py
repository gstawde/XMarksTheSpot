from flask import jsonify, request
from app import app, config
import mysql.connector

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

@app.route('/game/start', methods=['POST'])
def start_game():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    game_id = data.get('game_id')
    game_date = datetime.now()
    user_id = data.get('user_id')
    game_topic = data.get('game_topic')

    cursor.execute("INSERT INTO Gameplays (GAME_ID, GAME_DATE, GAME_FINISHED, USER_ID, GAME_TOPIC, USER_SCORE) VALUES (%s, %s, %s, %s, %s, %s)", (game_id, game_date, 0, user_id, game_topic, 0))
    connection.commit()
    
    cursor.close()
    connection.close()
    return jsonify({'success': True, 'message': 'New game created added successfully'})
  except Exception as e:
    return jsonify({'error': str(e)})