INSERT INTO posts (species, edible, date, description, image_url, user_id, loc_x, loc_y)
VALUES 
($1, $2, $3, $4, $5, $6, $7, $8);

SELECT * FROM users u
INNER JOIN posts p ON u.user_id = p.user_id
WHERE u.user_id = $6;