import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Title from "../Title";
import { PaymentForm } from "./PaymentForm";
import { ProductConsumer } from "../../context";

export const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  return (
    <ProductConsumer>
      {(context) => (
        <div className="py-5">
          <Title name="Pay" title={`${context.cartTotal} €`}></Title>
          <div className="container">
            <Formik
              initialValues={{ email: "", address: "", card: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.address) {
                  errors.address = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSubmitting(true);
                let res = {};
                try {
                  res = await axios.post(
                    "http://localhost:8080/api/payment-intent",
                    {
                      amount: Math.round(context.cartTotal * 100),
                      email: values.email,
                      address: values.address,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                } catch (err) {
                  console.log(err);
                }
                if (res.data) {
                  const clientSecret = res.data;

                  const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                      card: elements.getElement(CardElement),
                      billing_details: {
                        email: values.email,
                      },
                    },
                  });
                  if (result.error) {
                    console.log(result.error.message);
                    setErrors({ card: result.error.message });
                  } else {
                    if (result.paymentIntent.status === "succeeded") {
                      context.setPaymentPayload(result.paymentIntent);
                      context.clearCart();
                      history.push("/success");
                    }
                  }
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => <PaymentForm isSubmitting={isSubmitting} />}
            </Formik>
          </div>
        </div>
      )}
    </ProductConsumer>
  );
};
