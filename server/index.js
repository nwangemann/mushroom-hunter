require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const {login, registerUser, logout, userSession} = require('./controller/authCtrl')
const {getGuideSortName, searchGuide, searchGuideByScientific, searchGuideByEdible, searchGuideBySeason } = require('./controller/guideCtrl')
const {getUserPosts, deletePost, createPost, editPost, getPostDetails, getPostCoordinates} = require('./controller/postCtrl')
const app = express();
app.use(express.json());
const path = require('path');


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("connected to db");
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

//auth endpoints
app.post('/auth/login', login);
app.post('/auth/register', registerUser);
app.get('/auth/userSession', userSession);
app.get('/auth/logout', logout);

//post endpoints
app.get('/api/posts/:user_id', getUserPosts);
app.get('/api/detail/:post_id', getPostDetails)
app.delete('/api/delete/:post_id', deletePost);
app.post('/api/post/:user_id', createPost);
app.put('/api/edit/:post_id', editPost);
app.get('/api/coordinates/:user_id', getPostCoordinates);


//guide endpoints
app.get('/api/guide', getGuideSortName)
app.get('/api/search/:search_term', searchGuide)
app.get('/api/search_scientific/:search_term', searchGuideByScientific)
app.get('/api/search_edible/:search_term', searchGuideByEdible)
app.get('/api/search_season/:search_term', searchGuideBySeason)



app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () =>
  console.log(`Servin' up some 🔥 🔥 🔥 on Port ${SERVER_PORT}`)
);