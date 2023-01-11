import './payment-form.styles.jsx';
import { useEffect, useState, useContext } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { Button, BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer } from './payment-form.styles.jsx';
import { userContext } from '../../contexts/user.context.jsx';
import { cartOpenContext } from '../../contexts/cartOpen.context.jsx';

var style = {
  base: {
    color: '#32325d',
    fontFamily: 'Arial, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#32325d',
    },
  },
  invalid: {
    fontFamily: 'Arial, sans-serif',
    color: '#fa755a',
    iconColor: '#fa755a',
  },
};

const PaymentForm = () => {
  let elements = useElements();
  const { cartTotal } = useContext(cartOpenContext);
  const { currentUser } = useContext(userContext);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    if (elements) {
      const cardNumberElement =
        elements.getElement('card') || // check if we already created element
        elements.create('card', { style: style }); // create if dont

      cardNumberElement.mount('#numberInput');
    }
  }, [elements]);
  const stripe = useStripe();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch('/.netlify/functions/create-payment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal }),
    }).then((response) => response.json());

    const clientSecret = response.paymentIntent.client_secret;
    console.log('client secret ', clientSecret);

    setIsProcessing(true);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement('card'),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    console.log('paymentResult ', paymentResult.error);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('payment Successful');
      }
    }

    setIsProcessing(false);
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <div id='numberInput'></div>
        {/* <cardNumberElement /> */}
        <Button
          disabled={isProcessing}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          {' '}
          Pay now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
