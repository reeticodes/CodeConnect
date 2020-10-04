import {
  GET_ANNOUNCEMENTS,
  ADD_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  ANNOUNCEMENT_ERROR
} from "../actions/types";

const initialState = {
  announcements : [],
  announcement: null,
  loading: true,
  error:{}
};

export default function( state = initialState, action ) {
  const{ type, payload } = action;
  switch(type) {
    case GET_ANNOUNCEMENTS : 
    return {
      ...state,
      announcements: payload,
      loading: false
    };
  case ADD_ANNOUNCEMENT:
    return{
      ...state,
      announcements: [payload, ...state.announcement],
      loading:false
      }
  case DELETE_ANNOUNCEMENT:
    return {
      ...state,
        announcements: state.announcement.announcements.filter((ann) => ann._id !== payload),
        loading: false,
      };
  
  case ANNOUNCEMENT_ERROR:
    return {
    ...state,
    error: payload,
    loading: false,
  };
  default:
    return state;
}
  }
