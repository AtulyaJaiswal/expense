import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  registerLoginUserReducer,
  updateDataReducer,
} from "../src/reducers/userReducer";

const reducer = combineReducers({
  registerLoginUser: registerLoginUserReducer,
  updateData: updateDataReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
