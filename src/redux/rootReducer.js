import { combineReducers } from 'redux';

import triviaReducer from './Trivia/trivia.reducer';
import userReducer from './User/user.reducer';

export default combineReducers({
  user: userReducer,
  trivia: triviaReducer
});