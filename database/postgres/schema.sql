-- CREATE TABLE properties(
--    property_id INT GENERATED ALWAYS AS IDENTITY,
--    property_name VARCHAR(255) NOT NULL,
--    property_owner VARCHAR(255) NOT NULL,
--    num_of_review INT,
--    rating NUMERIC,
--    PRIMARY KEY(property_id)
-- );

-- CREATE TABLE users(
--    user_id INT GENERATED ALWAYS AS IDENTITY,
--    user_name VARCHAR(255) NOT NULL,
--    user_profileImg VARCHAR(500),
--    PRIMARY KEY(user_id)
-- );

-- CREATE TABLE reviews(
--    review_id INT GENERATED ALWAYS AS IDENTITY,
--    property_id INT REFERENCES properties (property_id) NOT NULL,
--    user_id INT REFERENCES users (user_id) NOT NULL,
--    review_date VARCHAR(10) NOT NULL,
--    review_comment VARCHAR(500),
--    PRIMARY KEY(review_id)
-- );

-- CREATE TABLE responses(
--    response_id INT GENERATED ALWAYS AS IDENTITY,
--    review_id INT REFERENCES reviews (id) NOT NULL,
--    response_date Date NOT NULL,
--    response_comment VARCHAR(500),
--    PRIMARY KEY(response_id)
-- );

CREATE TABLE properties(
   property_id INT,
   property_name VARCHAR(255) NOT NULL,
   property_owner VARCHAR(255) NOT NULL,
   num_of_review INT,
   rating NUMERIC,
   PRIMARY KEY(property_id)
);

CREATE TABLE users(
   user_id INT NOT NULL,
   user_name VARCHAR(255) NOT NULL,
   user_profileImg VARCHAR(500),
   PRIMARY KEY(user_id)
);

CREATE TABLE reviews(
   review_id SERIAL,
   property_id INT NOT NULL,
   user_id INT NOT NULL,
   review_date VARCHAR(10) NOT NULL,
   review_comment VARCHAR(500),
   PRIMARY KEY(review_id)
);

