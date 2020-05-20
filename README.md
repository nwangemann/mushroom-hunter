# **Personal Project**

## Mushroom Hunter

## Login Page
![UI](./public/s1.png?raw=true "Screen shot")

## Landing Page- Displays posts created by user account
![UI](./public/s2.png?raw=true "Screen shot")

## Map- Previously tagged post locations are marked on the Google Maps API with pins
![UI](./public/s3.png?raw=true "Screen shot")

## Map- Detail zoom of a pinned location, full Google Maps API functionality
![UI](./public/s4.png?raw=true "Screen shot")

## Field Guide- Responsive API created and implemented, contains mushroom identification information
![UI](./public/s5.png?raw=true "Screen shot")

## Field Guide- Detailed filter search allows for multiple parameters for searching the guide
![UI](./public/s6.png?raw=true "Screen shot")

## Create Post- This page allows a user to create a post, along with a map for setting location information
![UI](./public/s7.png?raw=true "Screen shot")

## Detail View- View the details of a post and edit the contents
![UI](./public/s8.png?raw=true "Screen shot")

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


**My Path To Points**
- Responsive Design (20 Points)
- Redux (20 Points)
- Authentication (10 Points)
- Presentation (10 Points)
- Hosting (10 Points)
- Other Technologies --Sass-- (10 points)

Total 80 Points

- Other Technologies (Google Maps API/Trefle API)

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

