-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`



DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS secrets CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


CREATE TABLE secrets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO secrets (title, description) VALUES ('hello world', 'a message from cpu');
