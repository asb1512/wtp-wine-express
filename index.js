const express = require('express');
require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const app = express();

app.use(cors());

app.get('/secret', async (req, res) => {
  if (req.query.amount) {
    const amount = req.query.amount

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } })
    }

    res.json({
      payment_intent_id: paymentIntent.id,
      client_secret: paymentIntent.client_secret
    })

  } else {
    res.status(400).send({
      message: 'No amount specified.'
    })
  }
});

app.listen(8000, () => {
  console.log('Running on port 8000');
});