import { Button } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import useAuth from "../../../../others/hooks/useAuth";
import useAxiosSecure from "../../../../others/hooks/axios/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ month, clientSecret, onClose }) {
  const secureApi = useAxiosSecure();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setIsLoading(true);
    // Block native form submission.
    event.preventDefault();
    console.log(month);

    if (!stripe || !elements) {
      setIsLoading(false);
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setIsLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setIsLoading(false);
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
        if (obj.paymentIntent.status) {
          setIsLoading(false);
          const { amount, status, id } = obj.paymentIntent;
          const history = {
            amount,
            payment_date: new Date().toUTCString(),
            id,
            status,
            month,
            uid: user.uid,
          };

          toast.success("Payment successful");

          const paymentHistory = await secureApi.put("/payment-history", {
            history,
          });

          if (paymentHistory.data.insertedId) {
            navigate("payment-history");
            setTimeout(() => {
              onClose();
            }, 1500);
          }
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
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
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          type="submit"
          disabled={isLoading || !stripe || !elements}>
          Pay
        </Button>
      </div>
    </form>
  );
}
CheckoutForm.propTypes = {
  month: PropTypes.string,
  clientSecret: PropTypes.string,
  onClose: PropTypes.func,
};
