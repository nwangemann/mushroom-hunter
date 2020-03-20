# **Personal Project**

## Mushroom Hunter

<ul>
MVP (minimum viable product): 
<li>Login/User authentication functionality</li>
<li>Full CRUD</li>
<li>Able to post an informational log for found mushrooms</li>
<li>Stores posts to user session/profile</li>
<li>User is able to edit and delete submitted posts</li>

</ul>

ICEBOX 1.0 (barely icebox)

- User is able to geotag location of found mushroom using the Google Maps API (and corresponding geotagging API available through Google Maps)
- User is able to select species of mushroom from list and have information pulled from Trefle (plant API) display, giving specifics regarding species

ICEBOX 2.0 (true icebox)

- A page which displays ALL posts stored within the database
- User can filter and search through existing posts based on location/species/other identifying parameters. 


***Client***
<br/><br/>
*dependencies*
- axios
- react-router-dom
- redux
- react-redux
- redux-promise-middleware
- http-proxy-middleware
<br/>

*routes*
- Main(/)
- User Profile (/user)
- Login (/login)
- Create New Post (/create)
- Detailed View (Location Display) (/details)


*file structure*
- src/
    - App.js
    - App.css
    - index.js
    - reset.css
    - redux
        - store
        - reducer 
    - Components/
        - Header.js /.css
        - Main.js /.css 
        - Login.js /.css
        - Post.js /.css
        - Detail.js /.css
        


***Server*** 
<br/>
*dependencies*
- express-session
- massive 
- express
- dotenv
- bcrypt

*endpoints*
<br/>

authCtrl:
- login: => /auth/login
- register: => /auth/register
- logout: => /auth/logout
- userSession: => /auth/user_session
<br/>

postCtrl:
- (app.get) getUserPosts: => /api/posts/:user_id
- (app.post) submitPost: => /api/post/:user_id
- (app.delete) deletePost: => /api/delete/:post_id
- (app.put) editPost: => /api/edit/:post_id


***Database***

```sql
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

