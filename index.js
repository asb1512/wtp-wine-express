const express = require('express');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const app = express();

app.get('/secret', async (req, res) => {
  if (req.query.amount) {
    const amount = req.query.amount

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({client_secret: paymentIntent.client_secret})

  } else {
    res.status(400).send({
      message: 'No amount specified.'
    })
  }
});

app.listen(8000, () => {
  console.log('Running on port 8000');
});