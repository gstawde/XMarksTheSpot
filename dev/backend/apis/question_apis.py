from flask import jsonify, request
from app import app, config
import mysql.connector
import random

def get_choice_type(question):
  question_type = question["question_type"]
  if(question_type == "Identification" or  question_type == "Geographical" or question_type == "Climate"):
    return "country_name"
  elif(question_type == "Fact Retrieval"):
    return question["answer_field"]

@app.route('/countries', methods=['GET'])
def get_countries():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Countries")
    countries = cursor.fetchall()

    return countries
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

countries = get_countries()

@app.route('/question/get/random', methods=['GET'])
def get_random_question(question_types=None):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Questions")
    questions = cursor.fetchall()

    if question_types is not None:
      questions = [q for q in questions if q["question_type"] in question_types]

    question = random.sample(questions, 1)[0]

    return question
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

@app.route('/question/get/mc', methods=['GET'])
def get_mc_question():
  try:
    random_question = get_random_question()
    question = random_question["question"] 
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]
    choice_type = get_choice_type(random_question)
    
    if answer is not None: 
      correct_countries = [country for country in countries if country[answer_field] == answer]
      correct_option = random.sample(correct_countries, 1)[0]
    else:
      correct_option = random.sample(countries,1)[0]

    incorrect_countries = [country for country in countries if country[answer_field] != correct_option[answer_field]]
    if len(incorrect_countries) >= 3:
      options = random.sample(incorrect_countries, 3)
    else: 
      options = incorrect_countries

    mc_question = {"question": question, "choice_type": choice_type, "correct_option": correct_option, "options": options}
    
    return jsonify({'success': True, 'message': 'Multiple choice question generated successfully.', 'result': mc_question})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

@app.route('/question/get/fib', methods=['GET'])
def get_fib_question():
  try:
    random_question = get_random_question(["Identification", "Fact Retrieval"])
    question = random_question["question"] 
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]
    choice_type = get_choice_type(random_question)

    if answer is not None: 
      correct_countries = [country for country in countries if country[answer_field] == answer]
      correct_option = random.sample(correct_countries, 1)[0]
    else:
      correct_option = random.sample(countries,1)[0]    
    
    fib_question = {"question": question, "choice_type": choice_type, "correct_option": correct_option}

    return jsonify({'success': True, 'message': 'Fill-in-the-blank question generated successfully', 'result': fib_question})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})
  