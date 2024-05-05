from datetime import datetime as dt
from flask import jsonify, request
from app import app, config
import mysql.connector

def valid_game(game_id, user_id):
  connection = mysql.connector.connect(**config)
  cursor = connection.cursor(dictionary=True)

  cursor.execute("SELECT * FROM Gameplays WHERE game_id = %s", (game_id,))
  game = cursor.fetchall()

  if not game: 
    cursor.close()
    connection.close()

    return {'success': False, 'message': f'Game with Game ID {game_id} does not exist.'}

  if game[0]['game_finished'] == 1:
    cursor.close()
    connection.close()

    return {'success': False, 'message': f'Game with Game ID {game_id} has finished.'}
  
  cursor.execute("SELECT * FROM Gameplays WHERE game_id = %s AND user_id = %s", (game_id, user_id))
  gameplay = cursor.fetchall()
  
  cursor.close()
  connection.close()

  if gameplay:
    return {'success': False, 'message': f'User is already in game.'}
  else:
    return {'success': True, 'message': f'User can play game with Game ID {game_id}.', 'result': game[0]}

def get_game_users(game_id):
  connection = mysql.connector.connect(**config)
  cursor = connection.cursor(dictionary=True)

  cursor.execute("SELECT * FROM Gameplays WHERE game_id = %s", (game_id,))
  games = cursor.fetchall()

  users = []

  for game in games: 
    user_id = game['user_id']
    
    cursor.execute("SELECT * FROM Users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()

    users.append(user)

  return users

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

@app.route('/game/create', methods=['POST'])
def create_game():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    
    data = request.get_json()
    game_id = data.get('game_id')
    game_date = dt.now().strftime('%Y-%m-%d %H:%M:%S')  # Convert datetime to string
    user_id = data.get('user_id')
    host = data.get('host')
    game_topic = data.get('game_topic')

    cursor.execute("INSERT INTO Gameplays (game_id, game_date, game_in_progress, game_finished, user_id, host, game_topic, user_score) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (game_id, game_date, 0, 0, user_id, host, game_topic, 0))
    connection.commit()
    
    cursor.close()
    connection.close()

    return jsonify({'success': True, 'message': 'New game created added successfully.'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/game/start/<int:game_id>', methods=["PUT"])
def start_game(game_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("UPDATE Gameplays SET game_in_progress = 1 WHERE game_id = %s", (game_id,))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({'success': True, 'message': f"Game {game_id} started successfully."})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/game/finish/<int:game_id>', methods=["PUT"])
def finish_game(game_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("DELETE FROM QuizQuestions WHERE game_id = %s", (game_id,))
    connection.commit()

    cursor.execute("UPDATE Gameplays SET game_in_progress = 0, game_finished = 1 WHERE game_id = %s", (game_id,))
    connection.commit()

    cursor.close()
    connection.close()
    
    return jsonify({'success': True, 'message': f'Game {game_id} finished successfully.'})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

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

@app.route('/game/get/<int:game_id>', methods=['GET'])
def get_game(game_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Gameplays WHERE game_id = %s", (game_id,))
    gameplays = cursor.fetchall()

    users = get_game_users(game_id)
    
    cursor.close()
    connection.close()

    result = {'gameplay': gameplays, 'users': users}

    return jsonify({'success': True, 'message': f'Gameplays for Game with Game ID {game_id} fetched successfully', 'result': result})
  except Exception as e:
    return jsonify({'success': False, 'message': f'Error: {str(e)}'})

@app.route('/game/get/<int:game_id>/<int:user_id>', methods=['GET'])
def get_gameplay(game_id, user_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Gameplays WHERE game_id = %s AND user_id = %s", (game_id, user_id))
    gameplay = cursor.fetchone()
    
    cursor.close()
    connection.close()

    return jsonify({'success': True, 'message': f'Gameplays for Game with Game ID {game_id} and User ID {user_id} fetched successfully', 'result': gameplay})
  except Exception as e:
    return jsonify({'success': False, 'message': f'Error: {str(e)}'})

@app.route('/game/join/<int:game_id>/<int:user_id>', methods=['POST'])
def join_game(game_id, user_id):
  try:
    game = valid_game(game_id, user_id)

    if(game['success']):
      connection = mysql.connector.connect(**config)
      cursor = connection.cursor(dictionary=True)

      game_date = dt.now().strftime('%Y-%m-%d %H:%M:%S')  # Convert datetime to string
      game_topic = game['result']['game_topic']

      cursor.execute("INSERT INTO Gameplays (game_id, game_date, game_finished, user_id, host, game_topic, user_score) VALUES (%s, %s, %s, %s, %s, %s, %s)", (game_id, game_date, 0, user_id, 0, game_topic, 0))
      connection.commit()
    
      cursor.close()
      connection.close()

      return jsonify({'success': True, 'message': f'User with User ID {user_id} added to Game {game_id}.'})
    else:
      return jsonify({'success': False, 'message': game['message']})
  except Exception as e:
    return jsonify({'success': False, 'message': f'Error: {str(e)}'})