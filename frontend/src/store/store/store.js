import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  petInfoReducer,
  petListReducer,
  postPetReducer,
} from "../reducers/petReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {getAdoptionRequestsReducer} from"../reducers/DashboardReducer"
import { getUserReducer,
         UserLoginReducer,
          UserRegisterReducer,
          getProfileReducer } from "../reducers/UserReducer";


const reducer = combineReducers({
  pets: petListReducer,
  pet: petInfoReducer,
  petsForm: postPetReducer,
  userLogin: UserLoginReducer,
  userData: getUserReducer,
  registerData: UserRegisterReducer,
  profile:getProfileReducer,
  userAdoptionRequests:getAdoptionRequestsReducer,
});

let intialState = {};

const userInfo = window.localStorage.getItem("userInfo");
if (userInfo) {
  intialState = {
    userLogin: {
      loading: false,
      success: true,
      info: JSON.parse(userInfo),
    },
  };
}

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
