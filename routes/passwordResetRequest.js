const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async(req,res,next) => {
  try{
    const requestPasswordResetService = await User.requestPasswordReset(req.body.email);
    return res.json(requestPasswordResetService);
  }
  catch(ex){
    next(ex);
  }
})

