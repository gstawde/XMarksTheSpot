# Building The Project

## Front-end: 
1. Navigate to dev/frontend.
2. Once in the folder, run npm i.
3. Then, run npm start.
4. Go to http://localhost:3000 to interact with the front-end.

## Docker Setup:
1. Navigate to dev/xmts-docker
2. Build the image: docker compose build
3. Start the docker services: docker compose up -d
4. Go to http://localhost:4000 to interact with the back-end.

## Back-end (Prev Backend Build Instructions): 
1. Navigate to dev/backend.
2. Installations: pip3 install Flask, pip3 install flask_cors, pip3 install jsonify, pip install flask-mysqldb, and pip install pyyaml
3. Once in the folder, run python3 app.py.
4. Go to http://localhost:5000 to interact with the back-end.

_Optional Steps: Use the Back-end with a Virtual Environment_
1. Run python3 -m venv venv in the backend folder
2. Navigate to source venv/bin/activate.
3. Run the installations commands.
4. After installing, run python3 server.py.
5. Go to http://localhost:5000 to interact with the back-end.
