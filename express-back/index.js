import { getPaymentIntent } from "./payment_intent";
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.post("/api/payment-intent", (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      getPaymentIntent(amount).then((paymentIntent) => {
        res.status(200).send(paymentIntent.client_secret);
      });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
