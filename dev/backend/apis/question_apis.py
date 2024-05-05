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

    connection.close()
    cursor.close()

    return countries
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

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

    cursor.close()
    connection.close()

    return question
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

#@app.route('/question/get/mc', methods=['GET'])
def get_mc_question():
  try:
    random_question = get_random_question("General")
    question = random_question["question"] 
    question_type = random_question["question_type"]
    question_level = random_question["question_level"]
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]
    
    countries = get_countries()

    if answer is not None: 
      correct_countries = [country for country in countries if country[answer_field] == answer]
      main_option = random.sample(correct_countries, 1)[0]
    else:
      main_option = random.sample(countries,1)[0]

    choice_type = get_choice_type(random_question)
    correct_option = main_option[choice_type]
  
    incorrect_countries = [country for country in countries if country[answer_field] != main_option[answer_field]]
    if len(incorrect_countries) >= 3:
      incorrect_options = random.sample(incorrect_countries, 3)
    else: 
      incorrect_options = incorrect_countries
    
    incorrect_options = [incorrect_option[choice_type] for incorrect_option in incorrect_options]

    options = incorrect_options + [correct_option]
    random.shuffle(options)

    display_flag = return_flag(question_type)
    if display_flag:
      flag = main_option["flag"]
    else:
      flag = None

    mc_question = {"question": question, "question_level": question_level, "question_type": "mc", "correct_option": correct_option, "options": options, "display_flag": display_flag, "flag": flag}
    
    return mc_question
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})

#@app.route('/question/get/fib', methods=['GET'])
def get_fib_question():
  try:
    random_question = get_random_question("General", ["Identification", "Fact Retrieval"])
    question = random_question["question"] 
    question_type = random_question["question_type"]
    question_level = random_question["question_level"]
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]

    countries = get_countries()

    main_option = random.sample(countries,1)[0]
        
    choice_type = get_choice_type(random_question)
    correct_option = main_option[choice_type]

    display_flag = return_flag(question_type)
    if display_flag:
      flag = main_option["flag"]
    else:
      flag = None

    fib_question = {"question": question, "question_level": question_level, "question_type": "fib", "correct_option": correct_option, "options": None, "display_flag": display_flag, "flag": flag}

    return fib_question
  except Exception as e:
    return jsonify({'success': False, 'message': str(e)})
  
#@app.route('/question/get/tf', methods=['GET'])
def get_tf_question():
  try:
    random_question = get_random_question("TF")
    question = random_question["question"] 
    question_type = random_question["question_type"]
    question_level = random_question["question_level"]
    answer_field = random_question["answer_field"]
    answer = random_question["answer"]

    reformatted_question = ""

    countries = get_countries()

    main_option = random.sample(countries, 1)[0]

    correct_option = main_option[answer_field]

    if answer is not None:
      reformatted_question += reformat_question(question, main_option["country_name"], main_option[answer_field])
      
      incorrect_option = ""

      tf = correct_option == answer
    else:
      tf_decider = random.sample([0,1], 1)[0]
      
      # tf will be true
      if tf_decider == 0:
        reformatted_question += reformat_question(question, main_option["country_name"], main_option[answer_field])
        
        incorrect_option = ""

        tf = True

      # tf will be false
      elif tf_decider == 1:
        incorrect_countries = [country for country in countries if country[answer_field] != answer]
        
        incorrect_option = random.sample(incorrect_countries, 1)[0]

        reformatted_question += reformat_question(question, main_option["country_name"], incorrect_option[answer_field])
        
        tf = False

    display_flag = True if question_type == "Identification" else False
    if display_flag:
      flag = main_option["flag"]
    else:
      flag = None

    tf_question = {"question": reformatted_question, "question_level": question_level, "question_type": "tf", "correct_option": correct_option, "options": None, "tf": tf, "display_flag": display_flag, "flag": flag}

    return tf_question
  except Exception as e:
    return jsonify({'success': False, 'message': str(e) })
  