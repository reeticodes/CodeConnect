import { 
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT
} from '../actions/types'

const initalState = {
  token : localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function(state = initalState,action){
  const{ type,payload}= action;

  switch(type){
    case USER_LOADED :
      return{
        ...state,
        isAuthenticated: true,
        loading:false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token',payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated:true,
        loading: false
      }
      
    case LOGOUT:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated:false,
        loading: false
      }
    case DELETE_ACCOUNT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    
      
    default:
      return state;
  }
}