import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  developerReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  eventCreateReducer,
  eventDeleteReducer,
  eventDetailsReducer,
  eventListReducer,
  eventReviewCreateReducer,
  eventTopRatedReducer,
  eventUpdateReducer,
} from "./reducers/eventReducers";

import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postListReducer,
  postReviewCreateReducer,
  postTopRatedReducer,
  postUpdateReducer,
} from "./reducers/postReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  developerList: developerReducer,

  postList: postListReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postReviewCreate: postReviewCreateReducer,
  postTopRated: postTopRatedReducer,

  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  eventDelete: eventDeleteReducer,
  eventCreate: eventCreateReducer,
  eventUpdate: eventUpdateReducer,
  eventReviewCreate: eventReviewCreateReducer,
  eventTopRated: eventTopRatedReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
  };
  
  const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;