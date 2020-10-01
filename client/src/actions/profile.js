import axios from 'axios';
import {setAlert} from './alert';
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, GET_REPOS,CLEAR_PROFILE, DELETE_ACCOUNT,NO_REPOS, GET_PROFILE_POSTS, POST_ERROR,CLEAR_POSTS, UPDATE_FOLLOW, FOLLOW_ERROR,GET_FOLLOWERS,GET_FOLLOWING } from './types';



//Get current users profile
export const getCurrentProfile = () => async dispatch =>  {
  
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload : res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg : err.response.statusText, status: err.response.status}
    });
  }
}
//Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({type: CLEAR_PROFILE});
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get  profile by id
export const getProfileById = (userId) => async dispatch => {
dispatch({type: CLEAR_PROFILE});
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const filterSearch = (name) => async dispatch =>{
  dispatch({type: CLEAR_PROFILE});
  try {
      const res = await axios.get(`/api/profile/filter?name=${name}`);
      dispatch({
      type:GET_PROFILES,
      payload: res.data
      });
  } catch (err) {
      dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}



//Get github repos
export const getGithubRepos = (username) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: NO_REPOS
      
    });
  }
}
//Get profile posts 
export const getprofileposts = (userid) => async dispatch => {
  dispatch({type: CLEAR_POSTS})
  try {
    const res = await axios.get(`/api/profile/user/${userid}/posts`);
    dispatch({
      type: GET_PROFILE_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR

    });
  }
}
//Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated !': 'Profile Created !', 'success'));
    if(!edit) {
      history.push('/feed');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Delete account & profile
export const deleteAccount = ()  => async dispatch => {
  
    try {
      await axios.delete('/api/profile');

      dispatch({type: CLEAR_PROFILE});
      dispatch({type: DELETE_ACCOUNT });
      
      dispatch(setAlert('Your accout has been permanently deleted'));
    } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
  }


//Get followers
export const getFolllowers = (userId) => async dispatch=> {
  try {
    const res = await axios.get(`/api/profile/followers/${userId}`)
    dispatch({
      type: GET_FOLLOWERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: {msg: err.response.statusText,
      status: err.response.status}
    });
  }
}


//Get following
export const getFollowing = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/following/${userId}`)

    dispatch({
      type: GET_FOLLOWING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
}



//Follow User
export const followUser = (userId) => async dispatch => {

  try {
    const res = await axios.put(`/api/profile/followuser/${userId}`);
    dispatch({
      type: UPDATE_FOLLOW,
      payload:{userId,followers: res.data}
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}


//Unfollow User
export const unfollowUser = (userId) => async dispatch => {

  try {
    const res = await axios.put(`/api/profile/unfollowuser/${userId}`);
    dispatch({
      type: UPDATE_FOLLOW,
      payload: { userId, followers: res.data }
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    })
  }
}