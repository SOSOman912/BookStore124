import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';
import {ContentContainer,ChatBotContainer,ContentBackgroudn} from './App.styles'
import ChatBot from './components/chatBot/chatBot.components.jsx';
import {selectDetailHidden, selectLoginMessageHidden} from './redux/shop/shop.selectors'
import DetailViewer from './components/detail/detail.component'
import Homepage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument, CheckIfUserExist } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/cart/cart.actions';
import { selectCurrentUser } from './redux/cart/cart.selectors';
import { fetchCollectionsStartAsync} from './redux/shop/shop.actions';
import axios from 'axios';
import EmailRegistrationPage from './pages/Email/Email.components.jsx';
import PortfolioPage from './pages/portfolio/portfolio.component.jsx';
import WarningLoginFirst from './components/WarningMessage/WarningLoginFirst.component'
import {fetchBuyingHistoryStartAsync} from './redux/Profile/Profile.actions.js'

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser,fetchCollectionsStartAsync,fetchBuyingHistoryStartAsync } = this.props;
    fetchCollectionsStartAsync();

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) { 
        const userRef = await createUserProfileDocument(userAuth).then(response => 
          axios.get('/api/login', {
            params: {
              user_id: response.uid
            }
          })).then(response => {setCurrentUser(response.data); fetchBuyingHistoryStartAsync(response.data.id) }).catch(error=> {
         if (error.response.status == 401) {
          console.log("Your account has not yet verifyed!");
         } 
        });
      } else {
          setCurrentUser(userAuth);
      }
    });


  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { DetailHidden, LoginHidden} = this.props;
    return (
          <ContentContainer>
                { DetailHidden ? null :
                  <DetailViewer />
                }
                { LoginHidden ? null :
                  <WarningLoginFirst />
                }
                  <Header /> 
                  <Switch>
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to ='/' />) : (<SignInAndSignUpPage />)} />
                    <Route exact path='/EmailSended' component={EmailRegistrationPage} />
                    <Route exact path='/Portfolio' component={PortfolioPage} />
                  </Switch>   
          </ContentContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  DetailHidden:  selectDetailHidden,
  LoginHidden: selectLoginMessageHidden
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchCollectionsStartAsync:  () => dispatch(fetchCollectionsStartAsync()),
  fetchBuyingHistoryStartAsync: currentUser => dispatch(fetchBuyingHistoryStartAsync(currentUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);