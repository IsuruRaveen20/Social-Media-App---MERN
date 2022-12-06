import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'


export const reducer = combineReducers({authReducer, postReducer})