import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import {productListReducer} from './reducers/productsReducers'
import { combineReducers } from 'redux'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    userLogin: userLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo : userInfoFromStorage},
    
}

// const middleware = [thunk]


const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(thunk),
})

export default store;