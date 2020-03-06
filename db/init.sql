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
    loc_x NUMERIC,
    loc_y NUMERIC,
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



-- Reference guide database
CREATE TABLE guide (
    id SERIAL PRIMARY KEY,
    species VARCHAR(50) NOT NULL,
    scientific_name TEXT,
    edible TEXT NOT NULL,
    eating_notes TEXT,
    season TEXT,
    frequency TEXT,
    description TEXT,
    image_url TEXT
);

INSERT INTO guide (species, scientific_name, edible, eating_notes, season, frequency, description, image_url)
VALUES 
-- example of entry to guide table
('Amethyst Deceiver', 'Laccaria amethystina', 'Edible', "The stem is tough and should be discarded before cooking. The favour isn't top-rank, but the colour is retained during cooking, so it can add visual interest to a dish.", 'July-December', 'Very Common', '
Cap: 1-5cm deep lilac or purple (but lighter when dry). Initially convex then flattened and sometimes slightly concave.
Gills:
Adnate or slightly decurrent. Widely spaced and powdery. Same colour as the cap.
Stem:
Thin and tough. Same base-colour as cap with white fibres near the cap.
Spores:
White
Flesh:
Thin and lilac coloured.
Habitat:
On the ground in mixed woodland', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4a%2F59%2F61%2F4a59610a2d9e1262786b8d6c1226a204.jpg&f=1&nofb=1');


ALTER TABLE guide 
ADD COLUMN season_search TEXT;


UPDATE guide
SET season_search = 'July, August, September'
WHERE season = 'July-September';

SELECT * FROM guide
WHERE season_search ILIKE 'July%';
