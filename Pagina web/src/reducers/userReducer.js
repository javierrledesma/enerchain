
// const initialState = {

// }

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {

//     case 'OBTAIN_USER':
//       return {
//         ...state,
//         initialState : action.payload
//       }

//       case 'SAVE_COURSES_USER':
//       initialState.hisCourses=action.payload.hisCourses
//       console.log(initialState)
//       return {
//         initialState
//       }
      
//     default:
//       return state
//   }
// }

// export default userReducer


import { combineReducers } from 'redux';
import { SAVE_USER_INFORMATION, SAVE_USER_LIST ,SAVE_MIS_MEDIDAS} from '../actions/actionCreators';

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

function misMedidas(state= [], action){
  switch (action.type) {
    case SAVE_MIS_MEDIDAS :
      return action.payload;
    default:
      return state;
  }
}

function user(state= null, action){
  switch (action.type) {
    case SAVE_USER_INFORMATION :
      return action.user;
    default:
      return state;
  }
}

function saveUsers(state= [], action){
  switch (action.type) {
    case SAVE_USER_LIST :
      return action.payload;
    default:
      return state;
  }
}


const GlobalState = (combineReducers({
  user,
  saveUsers,
  misMedidas
}))

export default GlobalState;