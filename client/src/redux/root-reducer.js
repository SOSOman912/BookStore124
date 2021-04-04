import { combineReducers } from 'redux';
import { persistReducer } from'redux-persist';
import storage from 'redux-persist/lib/storage'
import shopReducer from './shop/shop.reducer';
import Chatbotreducer from './chatBot/chatbot.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import FilteringReducer from './Filtering/Filtering.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart']
}

const rootReducer = combineReducers ({
	Filtering: FilteringReducer,
	cart: cartReducer,
	directory: directoryReducer,
	shop: shopReducer,
	chatBot: Chatbotreducer
});

export default persistReducer(persistConfig, rootReducer);