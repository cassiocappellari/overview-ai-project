<h1 align="center">Overview AI - Computer Vision APP</h1>

## 📋 Index

- Technologies
- Features
- How To Run
- Diagrams
- Author

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

- Uploading a video in MP4 format
- Access all the frames extracted from the video
- Access a Preview area that shows all prediction results and bounding boxes from the selected frame
- Access a Results table showing the last 10 prediction results from the selected frame
- Access a configuration area for model settings (IoU and Confidence level)

# How to Run

```bash
# Clone this repository

$ git clone https://github.com/cassiocappellari/overview-ai-project

# Enter the project folder

$ cd /overview-ai-project

```

## Back-end & Database

```bash
# Enter the server folder

$ cd ai_model
```
Before install the ai_model dependencies, configure the database .env variable:
## 🔑 .env

key|value
---|---
DATABASE_URL|`"postgresql://postgres:postgres@postgres-overview-ai-project:5432/postgres"`

```bash
# Build the docker image

$ docker build -t overview-ai-project .

# Run the Docker PostgreSQL container

$ docker run --name postgresql-overview-ai-project -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres

# Run the Docker Python API container

docker run --env-file .env --network overview-ai-network -p 5001:5000 overview-ai-project
```

In case that you receive an error connection on running the database, do the following steps:

```bash
# Create a dedicated network for the connection between the Docker PostgreSQL container and the Docker Python API container

docker network create overview-ai-network

# Link the Docker PostgreSQL container with the Docker Python API container

docker network connect overview-ai-network postgres-overview-ai-project

# Run the Docker Python API container again
docker run --env-file .env --network overview-ai-network -p 5001:5000 overview-ai-project
```

Once you run the Docker Python API container, 2 SQL queries will be executed to create 2 database schemas:

```sql
    CREATE TABLE IF NOT EXISTS frame (
        id SERIAL PRIMARY KEY,
        frame_reference VARCHAR(100) NOT NULL
    );
```

```sql
    CREATE TABLE IF NOT EXISTS prediction_result (
        id SERIAL PRIMARY KEY,
        box JSONB NOT NULL,
        class_name VARCHAR(100) NOT NULL,
        confidence FLOAT NOT NULL,
        frame_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_frame FOREIGN KEY (frame_id) 
            REFERENCES frame (id) 
            ON DELETE CASCADE
    );
```

## Front-end

```bash
# Enter on the client folder

$ cd client

# Install the dependencies

$ yarn install

# Start the project

$ yarn start

# Access the app

http://localhost:3000
```

# Diagrams

## Database relation

<img src="./client/assets/database_relation.png">

## API architecture

<img src="./client/assets/api_architecture.png">

## Application flow

<img src="./client/assets/diagram_app_flow.png">

# 👨‍🚀 Author

**Cássio Cappellari**

- GitHub: [@cassiocappellari](https://github.com/cassiocappellari)
- LinkedIn: [@cassiocappellari](https://www.linkedin.com/in/cassiocappellari/)
- Dev Community: [@cassiocappellari](https://dev.to/cassiocappellari)

---

Developed with 🤍 by Cássio Cappellari!