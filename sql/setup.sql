-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`



DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


CREATE TABLE tweets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id BIGINT REFERENCES users(id)
)
