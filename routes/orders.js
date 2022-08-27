const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_API_KEY2);
const app = express.Router();

const { isLoggedIn } = require('./middleware');
const Order = require('../db/Order');
const { User } = require('../db');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.createOrderFromCart());
  }
  catch(ex){
    next(ex);
  }
});
app.post('/guest', async(req, res, next)=> {
  try {
    res.send(await Order.createOrderFromCart());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/createGuestCart', async(req,res,next) => {
  try{
    console.log("this");
    console.log(req.body);
    res.status(200).send(await Order.create({isCart: true, guestId: req.body.guestId }));
  }
  catch(ex){
    next(ex);
  }
})

app.put('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.addToCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/guestCart', async(req, res, next)=> {
  console.log(req.body);
  try {
    res.send(await Order.prototype.guestAddToCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.getCart());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/guestCart/:id', async(req, res, next)=> {
  console.log(req.params.id);
  try {
    res.send(await Order.prototype.guestGetCart({guestId: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/create-checkout-session', async(req, res)=> {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body,
    mode: 'payment',
    success_url: process.env.CHECKOUT_SUCCESS_URL,
    cancel_url: process.env.CHECKOUT_CANCEL_URL,
  });
  res.json({ url: session.url })


});


module.exports = app;
