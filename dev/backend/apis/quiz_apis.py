from flask import jsonify, request
from app import app, config
from .question_apis import get_mc_question, get_fib_question, get_tf_question
import mysql.connector
import json
import random

@app.route('/api/quiz', methods=['GET'])
def generate_quiz():
  try:
    quiz = []

    for i in range(0, 10):
      # 0 = mc, 1 = fib, 2 = tf
      question_type_decider = random.sample(range(0,3), 1)[0]
      
      if question_type_decider == 0:
        mc_question = get_mc_question()
        quiz.append(mc_question)
      
      elif question_type_decider == 1:
        fib_question = get_fib_question()
        quiz.append(fib_question)

      elif question_type_decider == 2:
        tf_question = get_tf_question()
        quiz.append(tf_question)

    return {'success': True, 'message': 'Quiz generated successfully', 'result': quiz} 
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

@app.route('/api/quiz/questions', methods=['GET'])
def get_quiz_questions():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
        
    cursor.execute("SELECT * FROM QuizQuestions")
    questions = cursor.fetchall()
        
    cursor.close()
    connection.close()
    
    return jsonify(questions)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/quiz/question/<int:game_id>/<int:question_id>', methods=["GET"])
def get_quiz_question(game_id, question_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
        
    cursor.execute("SELECT * FROM QuizQuestions WHERE game_id = %s AND question_id = %s", (game_id, question_id))
    question = cursor.fetchall()
        
    cursor.close()
    connection.close()
    
    return jsonify({'success': True, 'message': f'Question {question_id} from Game {game_id} retrieved successfully', 'result': question})
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/api/quiz/add/question/<int:game_id>/<int:question_id>', methods=['POST'])
def add_quiz_question(game_id, question_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    data = request.get_json()
    question = data.get("question")
    question_level = data.get("question_level")
    question_type = data.get("question_type")
    correct_option = data.get("correct_option")
    flag = data.get("flag") if data.get("flag") else None

    if question_type == "mc":
      options = json.dumps(data.get("options"))

      cursor.execute("INSERT INTO QuizQuestions (game_id, question_id, question, question_level, question_type, correct_option, options, flag) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (game_id, question_id, question, question_level, question_type, correct_option, options, flag))
    elif question_type == "tf":
      tf = 1 if data.get("tf") == True else 0

      cursor.execute("INSERT INTO QuizQuestions (game_id, question_id, question, question_level, question_type, correct_option, tf, flag) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (game_id, question_id, question, question_level, question_type, correct_option, tf, flag))
    else:
      cursor.execute("INSERT INTO QuizQuestions (game_id, question_id, question, question_level, question_type, correct_option, flag) VALUES (%s, %s, %s, %s, %s, %s, %s)", (game_id, question_id, question, question_level, question_type, correct_option, flag))

    connection.commit()

    connection.close()
    cursor.close()

    return jsonify({'success': True, 'message': 'Quiz question added successfully.'})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

@app.route("/api/quiz/delete/<int:game_id>", methods=["DELETE"])
def delete_quiz(game_id):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("DELETE FROM QuizQuestions WHERE game_id = %s", (game_id,))
    connection.commit()

    connection.close()
    cursor.close()

    return jsonify({'success': True, 'message': f'Quiz for Game {game_id} deleted successfully.'})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})