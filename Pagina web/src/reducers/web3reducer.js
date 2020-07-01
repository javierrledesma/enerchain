import { combineReducers } from 'redux';
import { SAVE_WEB3, SAVE_ACCOUNTS, SAVE_ACADEMY, SAVE_VALUE, SAVE_CONTRACT_STORAGE, SAVE_CONTRACT_CLIENT} from '../actions/actionCreators';

// function courses(state = [], action){
//   switch(action.type) {

//     case SAVE_WEB3 :
//       console.log(action.web3)
//       return [{...state, web3: action.web3}];
    
//     case SAVE_ACCOUNTS :
//       return [...state,{
//         accounts: action.accounts
//       }];

//     case SAVE_ACADEMY :
//       return [...state,{
//         academy: action.academy
//       }];

//     case SAVE_VALUE :
//       return [...state,{
//         value: action.value
//       }];
//     default:
//       return state;
//   }
// };

function web3(state= null, action){
  switch (action.type) {
    case SAVE_WEB3 :
      
      return action.web3;
    default:
      return state;
  }
}

function accounts(state = [], action){
  switch (action.type) {
    case SAVE_ACCOUNTS :
      
      return action.accounts;
    default:
      return state;
  }
}

function academy(state = null, action){
  switch (action.type) {
    case SAVE_ACADEMY :
      
      return action.academy;
    default:
      return state;
  }
}

function contractStorage(state = null, action){
  switch (action.type) {
    case SAVE_CONTRACT_STORAGE:
      
      return action.contractStorage;
    default:
      return state;
  }
}

function contractClient(state = null, action){
  switch (action.type) {
    case SAVE_CONTRACT_CLIENT:
      
      return action.contractClient;
    default:
      return state;
  }
}

function value(state = 0, action){
  switch (action.type) {
    case SAVE_VALUE :
      
      return action.value;
    default:
      return state;
  }
}
const GlobalState = (combineReducers({
  web3,
  accounts,
  academy,
  value,
  contractStorage,
  contractClient
}))

export default GlobalState;