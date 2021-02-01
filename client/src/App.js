import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';
import {ContentContainer} from './App.styles'
import ChatBot from './components/chatBot/chatBot.components.jsx';
import {selectDetailHidden} from './redux/shop/shop.selectors'
import DetailViewer from './components/detail/detail.component'
import Homepage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { fetchCollectionsStartAsync} from './redux/shop/shop.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser,fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
                                                                
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }   
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { DetailHidden} = this.props;
    return (
          <ContentContainer>
                { DetailHidden ? null :
                  <DetailViewer />
                }
                  <Header /> 
                  <Switch>
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to ='/' />) : (<SignInAndSignUpPage />)} />
                  </Switch>  
                   <ChatBot />    
          </ContentContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  DetailHidden:  selectDetailHidden,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchCollectionsStartAsync:  () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);