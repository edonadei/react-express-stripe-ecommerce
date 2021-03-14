
# An ecommerce application that handle Stripe payment intents

A little ecommerce platform with Stripe integrated  

| <img  src="https://expressjs.com/images/express-facebook-share.png"  alt="Express"  width="217"  height="78"> | <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png"  alt="Stripe"  width="217"  height="91"> | <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRzeR8V-hnEMcNWxovp770-jcToYqlAuz7Lg&usqp=CAU"  alt="React"  width="148"  height="148"> |
|--|--|--|
| Web framework | API for payment | Front-end framework |

## Getting started
### Prerequisites

 - Docker ([Mac, Windows](https://www.docker.com/products/docker-desktop) or [Linux](https://docs.docker.com/engine/install/ubuntu/))

### Environment variables
 1. Go to your [Stripe developer dashboard](https://dashboard.stripe.com/test/dashboard) to get your API Keys
 2. Create a .env file in the folder `/express-back` with `STRIPE_SECRET=YOUR_STRIPE_PRIVATE_KEY`
 3. Create a .env file in the folder `/react-front` with `REACT_APP_STRIPE_API_KEY=YOUR_STRIPE_PUBLIC_KEY`

### Start the application
`docker-compose up`

Your web application is now running on http://localhost:3000

## Additional documentation

-  [Understand the Payment Intents API](https://stripe.com/docs/payments/payment-intents)

-  [Setup this endpoint with React](https://www.youtube.com/watch?v=w1oLdAPyuok)
