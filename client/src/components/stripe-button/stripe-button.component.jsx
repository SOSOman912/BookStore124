import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { cleanALlItemsFromCart } from '../../redux/cart/cart.actions';
import {connect} from 'react-redux';

const GenerateToken = function () {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
} 

const StripeCheckoutButton = ({ price , CartList, history,cleanALlItemsFromCart}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51I2etmDwDhx5BuMktM2pH5I8ZCPkUaFC4rf6VIY4tzZyQYG4dKP5PL8rVknjc9LOlEca5XAvYeNU2KDrvY6U4JgS00LV0Ktzj8';
  const receipt_id = GenerateToken()

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
        axios({
          url: '/api/updateHistory',
          method: 'post',
          data :{
            id: receipt_id,
            created_at: new Date().toUTCString(),
            updated_at: new Date().toUTCString(),
            Rating: "False",
            Items: CartList
          }
        })
      }).then(response2 => {
        alert('succesful payment');
        cleanALlItemsFromCart();
        history.push('/');
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

const mapDispatchToProps = (dispatch) => ({
cleanALlItemsFromCart: () => dispatch(cleanALlItemsFromCart())
})


export default withRouter(connect(null,mapDispatchToProps)(StripeCheckoutButton));