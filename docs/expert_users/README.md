# Building The Project

## Front-end: 
1. Navigate to dev/frontend.
2. Once in the folder, run npm i.
3. Then, run npm start.
4. Go to http://localhost:3000 to interact with the front-end.

_If the frontend cannot be started, try these steps:_
1. In dev/frontend, delete package-lock.json and node_modules
2. Run npm install
3. Run npm i
4. Run npm start

## Docker Setup:
1. Navigate to dev/xmts-docker
2. Build the image: docker compose build
3. Start the docker services: docker compose up -d
4. Go to http://localhost:4000 to interact with the back-end.
 
_(Don't run) Prev Backend Build Instructions:_ 
1. Navigate to dev/backend.
2. Installations: pip3 install Flask, pip3 install flask_cors, pip3 install jsonify, pip install flask-mysqldb, and pip install pyyaml
3. Once in the folder, run python3 app.py.
4. Go to http://localhost:5000 to interact with the back-end.

Optional: Use the Back-end with a Virtual Environment
1. Run python3 -m venv venv in the backend folder
2. Navigate to source venv/bin/activate.
3. Run the installations commands.
4. After installing, run python3 server.py.
5. Go to http://localhost:5000 to interact with the back-end.
