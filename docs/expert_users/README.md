# Building The Project

Clone the project: git clone https://github.com/gstawde/XMarksTheSpot.git

## Front-end: 
1. Navigate to dev/frontend.
2. Once in the folder, run npm i.
3. Then, run npm start.
4. Go to http://localhost:3000 to interact with the front-end.

_If the frontend cannot be started, try these steps:_
1. In dev/frontend, delete package-lock.json and node_modules
2. Run npm install
3. Run npm i
4. Run npm install js-cookie react-router-dom for dependencies
5. Run npm start

## Docker Setup:

Before running any of the Docker commands, make sure the Docker daemon is started by launching the Docker desktop app and making sure it is running. The Docker daemon status in the bottom left should be green and say something like 'Engine running'.

1. Navigate to dev/xmts-docker
2. Build the image: docker compose build
3. Start the docker services: docker compose up -d
4. Go to http://localhost:4000 to interact with the back-end.
