require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const {login, registerUser, logout, userSession} = require('./controller/authCtrl')
const {getUserPosts, deletePost, createPost, editPost} = require('./controller/postCtrl')
const app = express();
app.use(express.json());

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
app.delete('/api/delete/:post_id', deletePost);
app.post('/api/post/:user_id', createPost);
app.put('/api/edit/:post_id', editPost);


app.listen(SERVER_PORT, () =>
  console.log(`Servin' up some 🔥 🔥 🔥 on Port ${SERVER_PORT}`)
);