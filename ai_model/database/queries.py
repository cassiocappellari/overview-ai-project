INSERT_FRAME = '''
    INSERT INTO frame (frame_reference)
    VALUES (%s)
    RETURNING id, frame_reference;
'''

INSERT_PREDICTION_RESULT = '''
    INSERT INTO prediction_result (box, class_name, confidence, frame_id)
    VALUES (%s, %s, %s, %s)
    RETURNING id, box, class_name, confidence, frame_id, created_at;
'''

SELECT_PREDICTION_RESULTS = '''
    SELECT 
    pr.id, 
    pr.box, 
    pr.class_name, 
    pr.confidence, 
    pr.frame_id, 
    f.frame_reference, 
    pr.created_at
    FROM prediction_result pr
    JOIN frame f ON pr.frame_id = f.id
    WHERE pr.frame_id = %s
    ORDER BY pr.created_at DESC
    LIMIT 10;
'''

CREATE_FRAME_TABLE = '''
    CREATE TABLE IF NOT EXISTS frame (
    id SERIAL PRIMARY KEY,
    frame_reference VARCHAR(100) NOT NULL
);
'''

CREATE_PREDICTION_RESULT_TABLE = '''
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
'''