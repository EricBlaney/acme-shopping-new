const express = require('express');
const app = express();
const { User, Product, Token } = require('./db');
const path = require('path');
const { useStore } = require('react-redux');
const Dotenv = require('dotenv-webpack');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/dist', express.static('dist'));

<<<<<<< HEAD
// Dotenv({
//   path:path.resolve(__dirname, './env')
// })



=======
>>>>>>> b5344184ce2da710de8e1f56b16f41a7a3c0c16f
const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  }
  catch(err){
    next(err);
  }
};

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/passwordReset', require('./routes/passwordReset'));
app.use('/api/passwordResetRequest', require('./routes/passwordResetRequest'));
// Product Routes

app.get('/api/products', async(req,res,next)=>{
  try{
    res.status(200).send(await Product.findAll())

  }catch(err){
    next(err);
  }
});

app.get('/api/products/:id', async(req,res,next)=>{
  try{
    const game = await Product.findByPk(req.params.id);
    res.status(200).send(game);

  }catch(err){
    next(err);
  }
});

// WishList Routes

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.createWishListFromWishListItems());
  }
  catch(err){
    next(err);
  }

});

app.put('/api/wishlist', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.addToWishList(req.body));
  }
  catch(err){
    next(err);
  }
});

app.get('/api/wishlist', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getWishList());
  }
  catch(err){
    next(err);
  }
});

// User Routes

app.post('/api/users', async(req,res,next) => {
  try{
      res.status(200).send(await User.create(req.body));
  }
  catch(err){
    next(err);
  }
});

app.get('/api/users', async(req,res,next) => {
  try{
    res.status(200).send(await User.findAll())
  }
  catch(err){
    next(err);
  }
});

app.get('/api/users/:id', async(req,res,next) => {
  try{
    res.status(200).send(await useStore.findByPk(req.params.id))
  }
  catch(err){
    next(err);
  }
});

app.delete('/api/users/:id', async(req,res,next) => {
  try{
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch{
    next(err);
  }
});

app.put('/api/users', async(req,res,next) => {
  try{
    const user = await User.findByPk(req.body.id);
    await user.update(req.body);
    res.status(200).send(user);
  }
  catch(err){
    next(err);
  }
});

//Token Routes
app.get('/api/tokens', async(req,res,next) => {
  try{
    const token = await Token.findOne({where: {userId: req.body.userId}})
    res.send(token);
  }
  catch(err){
    next(err);
  }
})


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err });
});



module.exports = app;
