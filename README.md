# **Personal Project**

## Mushroom Hunter/ alt (FungEye?)

<ul>
MVP (minimum viable product): 
<li>Login/User authentication functionality</li>
<li>Full CRUD</li>
<li>Able to post an informational log for found mushrooms</li>
<li>Stores posts to user session/profile</li>
<li>User is able to edit and delete submitted posts</li>

</ul>

ICEBOX

- User is able to geotag location of found mushroom
- User is able to select species of mushroom from list and have information pulled from Trefle (plant API) display, giving specifics regarding species



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
        - Login.js /.css


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

auth:
- login: => /auth/login
- register: => /auth/register
- logout: => /auth/logout
- userSession: => /auth/user_session
<br/>

logCtrl:


***Database***
