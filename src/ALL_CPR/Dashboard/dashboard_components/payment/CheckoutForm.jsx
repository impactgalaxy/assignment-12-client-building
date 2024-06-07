import { Button } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import useAuth from "../../../../others/hooks/useAuth";
import useAxiosSecure from "../../../../others/hooks/axios/useAxiosSecure";

export default function CheckoutForm({ month, clientSecret }) {
  const secureApi = useAxiosSecure();
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    console.log(month);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      try {
        const obj = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName ? user?.displayName : "Unknown name",
              email: user?.email ? user?.email : "Unknown email",
            },
          },
        });
        const paymentHistory = await secureApi.post("/payment-history", {
          month,
          uid: user.uid,
          obj,
        });
        console.log(paymentHistory.data);
        console.log(obj);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <div className="flex items-center justify-end py-5">
        <Button colorScheme="blue" type="submit" disabled={!stripe}>
          Pay
        </Button>
      </div>
    </form>
  );
}
CheckoutForm.propTypes = {
  month: PropTypes.string,
  clientSecret: PropTypes.string,
};
