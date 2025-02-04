<h1 align="center">Overview AI - Computer Vision APP</h1>

## 📋 Index

- Technologies
- Features
- Diagrams
- How To Run
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
- Access a Configuration area for model settings (IoU and Confidence level)

# Diagrams

## Database relation

- 1 frame can have many prediction results
- 1 prediction result belongs to only 1 frame

<img src="./client/assets/database_relation.png">

## API architecture

Simple and basic API layered architecture, where:

1. The Presentation layer (controllers) consume the Services layer (prediction models)
2. The Presentation layer (controllers) gets the SQL queries from the Persistence layer to create and retrieve resources

<img src="./client/assets/api_architecture.png">

## Application flow

<img src="./client/assets/diagram_app_flow.png">

### API Endpoints

```
# POST /detect

- Request payload

{
    "image_path": "./captured_frames/frame_001.png",
    "confidence": 0.8,
    "iou": 0.8
}

- Request response

{
	"results": [
		{
			"box": {
				"height": 145,
				"left": 2453,
				"top": 1370,
				"width": 215
			},
			"class_name": "car",
			"confidence": 0.857473611831665,
			"created_at": "2025-02-04T10:06:50.111316",
			"frame_id": 69,
			"frame_reference": "frame_001.png",
			"id": 651
		}
	]
}
```
```
# GET /prediction_results/:frame_id

- Request response

{
	"results": [
		{
			"box": {
				"height": 145,
				"left": 2453,
				"top": 1370,
				"width": 215
			},
			"class_name": "car",
			"confidence": 0.857473611831665,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 1
		},
		{
			"box": {
				"height": 133,
				"left": 957,
				"top": 1345,
				"width": 162
			},
			"class_name": "car",
			"confidence": 0.75055992603302,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 2
		},
		{
			"box": {
				"height": 184,
				"left": 178,
				"top": 1375,
				"width": 221
			},
			"class_name": "car",
			"confidence": 0.744117021560669,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 3
		},
		{
			"box": {
				"height": 135,
				"left": 518,
				"top": 1382,
				"width": 188
			},
			"class_name": "car",
			"confidence": 0.7373993992805481,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 4
		},
		{
			"box": {
				"height": 456,
				"left": 2953,
				"top": 1285,
				"width": 257
			},
			"class_name": "person",
			"confidence": 0.7209800481796265,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 5
		},
		{
			"box": {
				"height": 108,
				"left": 827,
				"top": 1372,
				"width": 102
			},
			"class_name": "car",
			"confidence": 0.6882709860801697,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 6
		},
		{
			"box": {
				"height": 160,
				"left": 1747,
				"top": 1333,
				"width": 103
			},
			"class_name": "person",
			"confidence": 0.6695649027824402,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 7
		},
		{
			"box": {
				"height": 226,
				"left": 2086,
				"top": 1283,
				"width": 292
			},
			"class_name": "truck",
			"confidence": 0.5897232890129089,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 8
		},
		{
			"box": {
				"height": 128,
				"left": 2350,
				"top": 1329,
				"width": 168
			},
			"class_name": "car",
			"confidence": 0.5128593444824219,
			"created_at": "2025-02-03T21:36:36.287512",
			"frame_id": 1,
			"frame_reference": "frame_001.png",
			"id": 9
		}
	]
}
```

# How to Run

```bash
# Clone this repository

$ git clone https://github.com/cassiocappellari/overview-ai-project

# Enter on the project folder

$ cd /overview-ai-project

```

## Back-end & Database

```bash
# Enter on the ai_model folder

$ cd ai_model
```
Before install the ai_model dependencies, configure the database .env variable:
## 🔑 .env

key|value
---|---
DATABASE_URL|`"postgresql://postgres:postgres@postgres-overview-ai-project:5432/postgres"`

```bash
# Build the Docker image

$ docker build -t overview-ai-project .

# Run the Docker PostgreSQL container

$ docker run --name postgresql-overview-ai-project -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres

# Create a dedicated network for the connection between the Docker PostgreSQL container and the Docker Python API container

$ docker network create overview-ai-network

# Link the Docker PostgreSQL container with the Docker Python API container

$ docker network connect overview-ai-network postgres-overview-ai-project

# Run the Docker Python API container
$ docker run --env-file .env --network overview-ai-network -p 5001:5000 overview-ai-project
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

# 👨‍🚀 Author

**Cássio Cappellari**

- GitHub: [@cassiocappellari](https://github.com/cassiocappellari)
- LinkedIn: [@cassiocappellari](https://www.linkedin.com/in/cassiocappellari/)
- Dev Community: [@cassiocappellari](https://dev.to/cassiocappellari)

---

Developed with 🤍 by Cássio Cappellari!