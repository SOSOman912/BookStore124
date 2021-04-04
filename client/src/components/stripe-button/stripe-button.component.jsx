import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51I2etmDwDhx5BuMktM2pH5I8ZCPkUaFC4rf6VIY4tzZyQYG4dKP5PL8rVknjc9LOlEca5XAvYeNU2KDrvY6U4JgS00LV0Ktzj8';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert('succesful payment');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          `There was an issue with your payment! Please make sure you use the provided credit card.
           Reason: ${error.message}
          `
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='YOLO MALL'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;