import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE, GET_REPOS, NO_REPOS, GET_PROFILE_POSTS, GET_FOLLOWERS, GET_FOLLOWING, UPDATE_FOLLOW, FOLLOW_ERROR } from "../actions/types";

const initialState = {
  profile : null,
  profiles : [],
  repos: [],
  loading : true,
  error: {}
}

export default function(state = initialState,action){
const {type, payload} = action;

switch(type){
  case GET_PROFILE:
    return{
      ...state,
      profile: payload,
      loading : false
    }
  case PROFILE_ERROR:
    return{
      ...state,
      error: payload,
      loading: false,
      profile : null
    };
  case GET_PROFILES:
    return{
      ...state,
      profiles: payload,
      loading: false
    }
  case CLEAR_PROFILE:
    return{
      ...state,
      profile:null,
      repos:[],
      loading:false
    };
  case GET_REPOS:
    return{
      ...state, 
      repos : payload,
      loading: false
    }
  case NO_REPOS:
    return {
      ...state,
      repos: []
    };
  case GET_FOLLOWERS:
    return {
      ...state,
      profiles: payload,
      loading: false
    }
  case GET_FOLLOWING:
    return {
      ...state,
      profiles: payload,
      loading: false
    }
  case UPDATE_FOLLOW:
    return {
      ...state,
      profile: {...state.profile, followers: state.profile.followers.map(follower => follower.user === payload ? {...follower, followers: payload.folllowers }: follower)},
      loading: false
    }
  case FOLLOW_ERROR:
    return{
      ...state,
      error: payload,
      loading: false
    }
    default: return state;
}
}