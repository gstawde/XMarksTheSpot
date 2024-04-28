from flask import jsonify, request
from app import app, config
from .question_apis import get_mc_question, get_fib_question, get_tf_question
import mysql.connector
import json
import random

@app.route('/quiz', methods=['GET'])
def generate_quiz():
  try:
    quiz = []

    for i in range(0, 15):
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

    return {'success': True, 'message': 'Quiz generated successfully', 'quiz': quiz} 
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})
