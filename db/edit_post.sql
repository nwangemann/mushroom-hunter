UPDATE posts
SET species = $1,
loc_x = $2,
loc_y = $3,
edible = $4,
date = $5,
description = $6,
image_url = $7
WHERE post_id = $8;

SELECT * FROM posts
WHERE posts.post_id = $8;