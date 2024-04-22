from flask import jsonify, request
from app import app, config
import mysql.connector
import random

@app.route('/countries', methods=['GET'])
def get_countries():
  try:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Countries")
    countries = cursor.fetchall()

    return jsonify(countries)
  except Exception as e:
    return jsonify({'error': str(e)})

@app.route('/question/get/mc', methods=['GET'])
def get_mc_question():
  #try:
    # connection = mysql.connector.connect(**config)
    # cursor = connection.cursor(dictionary=True)

    # cursor.execute("SELECT * FROM CountryInfo")
    # countries = cursor.fetchall()
      
    # options = random.sample(countries, 4)

    # if options:
    #   correct_option = options[0]
    #   second_option = options[1]
    #   third_option = options[2]
    #   fourth_option = options[3]

    #   return jsonify({
    #     'success': True, 
    #     'correct_option': correct_option['country_name'], 
    #     '2nd option': second_option['country_name'],
    #     '3rd option': third_option['country_name'],
    #     '4th option': fourth_option['country_name']
    #   })
    # else:
    #   return jsonify({'message': 'No countries found!'})

    # cursor.close()
    # connection.close()

    return jsonify({'message': 'In progress!'})