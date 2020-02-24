DELETE FROM posts 
WHERE post_id = $1;

SELECT * FROM users u
INNER JOIN posts p ON u.user_id = p.user_id
WHERE u.user_id = $2;