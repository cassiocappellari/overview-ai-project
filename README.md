<h1 align="center">Overview AI - Computer Vision APP</h1>

## 📋 Index

- [Overview](#-overview)
- [The Task](#-the-task)
- [Technologies](#-technologies)
- [Features](#-features)
- [How To Use](#-how-to-use)
- [Author](#-author)

# Overview

This project is a full-stack application that showcases an AI object detection model's predictions through a user-friendly dashboard. The backend is built with Flask in Python, serving predictions from an ONNX model. The front end is developed using React and Fabric.js, providing an interactive interface to display the detected objects. You can edit any backend files, even changing the API structure.

# The Task

The task is to create a frontend that interfaces with the backend, plays a video file, sends each frame to the API for prediction, and then shows the results on the frontend. The interface should have a video player, a configuration area for model settings to be configured (such as IoU and Confidence Level), a preview area where each bounding box returned by the model is drawn on top of the predicted frame (using Fabric.JS), and a table for the last 10 prediction results.

# Technologies

## Front-end

- React.js
- TypeScript
- Fabric.js
- React Redux
- TailwindCSS
- Axios

## Back-end

- Flask
- Python
- Docker

## Database

- PostgreSQL

# Features

- Upload a video in MP4 format
- Capture each frame image from the video
- Acess all the frames extracted from the video
- Preview area to show all the prediction results from the selected frame
- Table showing the last 10 prediction results from the selected frame
- Configuration area for model settings (IoU and Confidence Level)

# 🛠 How to Run

```bash
# Clone this repository

$ git clone https://github.com/cassiocappellari/overview-ai-project

# Enter the project folder

$ cd /overview-ai-project

```

## Back-end

```bash
# Enter the server folder

$ cd ai_model
```
Before install the server dependencies, configure the database .env variable:
## 🔑 .env

key|value
---|---
DATABASE_URL|`"postgresql://postgres:postgres@postgres-overview-ai-project:5432/postgres"`

```bash
# Build the docker image

$ docker build -t overview-ai-project .

# Run the Docker PostgreSQL container

$ docker run --name postgresql-overview-ai-project -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres

# Run the Docker API container (After you run it, the code should execute the SQL to create the database tables)

docker run --env-file .env --network overview-ai-network -p 5001:5000 overview-ai-project

# In case that you receive an error connection on running the database, do the following steps

# Create a dedicated network for the connection between the Docker PostgreSQL container and the Docker API container

docker network create overview-ai-network

# Link the Docker PostgreSQL container with the Docker API container

docker network connect overview-ai-network postgres-overview-ai-project

# Run the Docker API container again
docker run --env-file .env --network overview-ai-network -p 5001:5000 overview-ai-project
```

## Front-end

```bash
# Enter the client folder

$ cd client

# Install the dependencies

$ yarn install

# Start the project

$ yarn start

# Access the app

http://localhost:3000
```

# 👨‍🚀 Author

**Cássio Cappellari**

- GitHub: [@cassiocappellari](https://github.com/cassiocappellari)
- LinkedIn: [@cassiocappellari](https://www.linkedin.com/in/cassiocappellari/)
- Dev Community: [@cassiocappellari](https://dev.to/cassiocappellari)

---

Developed with 🤍 by Cássio Cappellari!