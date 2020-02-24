UPDATE posts
SET species = $1,
location = $2,
edible = $3,
date = $4,
description = $5,
image_url = $6
WHERE post_id = $7;

SELECT * FROM users u
INNER JOIN posts p ON u.user_id = p.user_id
WHERE u.user_id = $8;