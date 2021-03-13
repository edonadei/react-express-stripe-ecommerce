import React from "react";
import { ProductConsumer } from "../../context";
import Title from "../Title";

export const PaymentComplete = () => {
  return (
    <div className="py-5">
      <div className="container">
        <Title title="Congratulations"></Title>
        <ProductConsumer>
          {(context) => (
            <div className="flex mt-5">
              <h1> Stripe ID: {context.paymentPayload.id} </h1>
              <h1> Amount: {context.paymentPayload.amount/100}€ </h1>
            </div>
          )}
        </ProductConsumer>
      </div>
    </div>
  );
};
