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

def return_flag(question_type):
  if question_type == "Identification" or question_type == "Fact Retrieval":
    return True
  else: 
    return False

def reformat_question(question, country_name, answer):
  x_idx = question.find("X")
  y_idx = question.find("Y")
  
  reformatted_question = ""

  if y_idx == -1:
    reformatted_question += question[:x_idx] + country_name + question[x_idx + 1:]
  else:
    reformatted_question += (question[:x_idx] + country_name + 
                             question[x_idx + 1:y_idx] + answer + 
                             question[y_idx + 1:])

  return reformatted_question if reformatted_question is not None else ""

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

@app.route('/questions', methods=['GET'])
def get_questions():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
      
    cursor.execute("SELECT * FROM Questions")
    questions = cursor.fetchall()
      
    cursor.close()
    connection.close()
    
    return jsonify(questions)
  except Exception as e:
    return jsonify({'success': False, 'error': str(e)})

@app.route('/question/get/random/<question_format>', methods=['GET'])
def get_random_question(question_format, question_types=None):
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    if question_format == "General":
      cursor.execute("SELECT * FROM Questions WHERE question_format = %s", ("General",))
    elif question_format == "TF":
      cursor.execute("SELECT * FROM Questions WHERE question_format = %s", ("TF",))
      
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
    random_question = get_random_question("General")
    question = random_question["question"] 
    question_type = random_question["question_type"]
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]
    choice_type = get_choice_type(random_question)
    
    countries = get_countries()

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

    if return_flag(question_type):
      display_flag = True
    else:
      display_flag = False

    mc_question = {"question": question, "choice_type": choice_type, "correct_option": correct_option, "options": options, "display_flag": display_flag}
    
    return jsonify({'success': True, 'message': 'Multiple choice question generated successfully.', 'result': mc_question})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

@app.route('/question/get/fib', methods=['GET'])
def get_fib_question():
  try:
    random_question = get_random_question("General", ["Identification", "Fact Retrieval"])
    question = random_question["question"] 
    question_type = random_question["question_type"]
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]
    choice_type = get_choice_type(random_question)

    countries = get_countries()

    if answer is not None: 
      correct_countries = [country for country in countries if country[answer_field] == answer]
      correct_option = random.sample(correct_countries, 1)[0]
    else:
      correct_option = random.sample(countries,1)[0]    
    
    if return_flag(question_type):
      display_flag = True
    else:
      display_flag = False

    fib_question = {"question": question, "choice_type": choice_type, "correct_option": correct_option,  "display_flag": display_flag}

    return jsonify({'success': True, 'message': 'Fill-in-the-blank question generated successfully', 'result': fib_question})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})
  
@app.route('/question/get/tf', methods=['GET'])
def get_tf_question():
  try:
    random_question = get_random_question("TF")
    question = random_question["question"] 
    question_type = random_question["question_type"]
    reformatted_question = ""
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]

    countries = get_countries()

    correct_option = random.sample(countries, 1)[0]
    display_flag = False

    if answer is not None:
      if answer_field == "flag":
        display_flag = True

      reformatted_question += reformat_question(question, correct_option["country_name"], correct_option[answer_field])

      tf = correct_option[answer_field] == answer
    else:
      random_val = random.sample([0,1], 1)[0]
      
      # tf will be true
      if random_val == 0:
        if answer_field == "flag":
          display_flag = True

        reformatted_question += reformat_question(question, correct_option["country_name"], correct_option[answer_field])
        
        tf = True
      # tf will be false
      elif random_val == 1:
        if answer_field == "flag":
          display_flag = True

          incorrect_countries = [country for country in countries if country != correct_option]
        else:
          incorrect_countries = [country for country in countries if country[answer_field] != answer]
        
        incorrect_option = random.sample(incorrect_countries, 1)[0]

        reformatted_question += reformat_question(question, correct_option["country_name"], incorrect_option[answer_field])
        
        tf = False

    tf_question = {"question": reformatted_question, "correct_option": correct_option, "tf": tf, "display_flag": display_flag}

    return jsonify({'success': True, 'message': 'True/False question generated successfully', 'result': tf_question})
  except Exception as e:
    return jsonify({'success': False, 'message': str(e) })
  