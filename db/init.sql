CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL,
);

INSERT INTO users(username, password, email)
VALUES 
('t', 't', 't')
('test', 'test', 'test');

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    species TEXT,
    location TEXT,
    edible TEXT,
    date TEXT,
    description TEXT,
    image_url TEXT,
    user_id INT REFERENCES users(user_id)
);

INSERT INTO posts(species, location, edible, date, description, image_url, user_id)
VALUES 
('Chantrelle', 'LocationTest', 'Yes', '12/20/19', 'This is a fun little sample description', 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/all_about_mushrooms_slideshow/493ss_thinkstock_rf_poisonous_mushroom.jpg', 1),
('Oyster', 'LocationTest2', 'Yes', '10/20/19', 'This is a second sample description', 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/all_about_mushrooms_slideshow/493ss_thinkstock_rf_poisonous_mushroom.jpg', 2);

-- basic join format
SELECT * FROM users u
INNER JOIN posts p
ON u.user_id = p.user_id;

-- join format for selecting all posts from a specific user
SELECT * FROM users u
INNER JOIN posts p
ON u.user_id = p.user_id
WHERE u.user_id = $1;
```