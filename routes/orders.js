const express = require('express');
const stripe = require('stripe')('sk_test_51LZN7BDFzNDjkHzZXfRweOHxroFYedkM3NvPch4QTXBjCp29t5rV8gx6BQRYRUfhe2mlAieHqaKCTV91fKTU8k4n00dCPmJ5zV');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.createOrderFromCart());
  }
  catch(ex){
    next(ex);
  }

});

app.put('/cart', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await req.user.addToCart(req.body));
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

app.post('/create-checkout-session', async(req, res)=> {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body,
    mode: 'payment',
    success_url: `http://localhost:3000/cart/success`,
    cancel_url: `http://localhost:3000/cart/cancel`,
  });

  res.json({ url: session.url })


});
