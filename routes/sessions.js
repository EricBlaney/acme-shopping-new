const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');
const axios = require('axios');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    const credentials = {
      username: req.body.username, 
      password: req.body.password
    }
    res.send({ token: await User.authenticate(credentials)});
  }
  catch(ex){
    next(ex);
  }
});

app.post('/admin', async(req, res, next)=> {
  try {
    const credentials = {
      username: req.body.username, 
      password: req.body.password,
    }
      res.send({ token: await User.adminAuthenticate(credentials)});
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, async(req, res, next)=> {
  res.send(req.user);
});

app.get('/github', (req, res, next)=> {
  console.log(process.env.GITHUB_CLIENT_ID)
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`);
  
});
app.get('/github/callback', async(req, res, next)=> {
  try {
    let response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET_KEY,
      code: req.query.code
    }, {
      headers: {
        accept: 'application/json'
      }
    });
    const { error, access_token } = response.data;
    if(error){
      console.log(error);
      const ex = new Error(error);
      ex.status = 401;
      next(ex);
    }
    else {
      response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${access_token}`
        }
      });
      const { login, id} = response.data;
      console.log(response);
      const where = {
        username: login,
        githubId: id
      };
      let email_response = await axios.get(`https://api.github.com/user/emails`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${access_token}`
        }
      });
      const emails = email_response.data
      if (emails?.length > 0 ) {
        where.email = emails.sort((a, b) => b.primary - a.primary)[0].email
      }
      let user = await User.findOne({ where });
      if(!user){
        user = await User.create({...where, password: Math.random().toString()});
      }
      const token = require('jsonwebtoken').sign({ id: user.id}, process.env.JWT);
      res.send(`
        <html>
          <head>
            <script>
              window.localStorage.setItem('token', '${ token }');
              window.location = '/';
            </script>
          </head>
          <body>
          ...Signing In
          </body>
        </html>
      `);
    }
  }
  catch(ex){
    next(ex);
  }
});