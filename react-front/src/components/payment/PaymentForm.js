import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { ErrorMessage, Field, Form } from "formik";

export const PaymentForm = ({ isSubmitting }) => {
  return (
    <div className="container">
      <Form>
        <div className="row justify-content-center">
          <Field
            className="mt-5 w-50 form-control"
            placeholder="Your email"
            type="email"
            name="email"
          />
        </div>
        <div className="row justify-content-center">
          <ErrorMessage className="text-danger" name="email" component="div" />
        </div>
        <div className="row justify-content-center">
          <Field
            className="mt-4 w-50 form-control"
            placeholder="Your address"
            type="text"
            name="address"
          />
        </div>
        <div className="row justify-content-center">
          <ErrorMessage className="text-danger" name="address" component="div" />
        </div>
        <div className="row justify-content-center ">
          <div className="p-2 mt-4 w-50 bg-light rounded border border-grey">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <ErrorMessage className="text-danger" name="card" component="div" />
        </div>
        <div className="row justify-content-center ">
          <div className="mt-4">
            <button className="btn btn-primary align-middle" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};
