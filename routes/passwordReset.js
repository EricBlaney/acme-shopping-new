const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async(req,res,next) => {
    console.log(req.body);
    try{
        const resetPasswordService = await User.resetPassword(
            req.body.userId,
            req.body.token,
            req.body.password
          );
          return res.json(resetPasswordService);
    }

      catch(ex){
        next(ex);
      }
} )

