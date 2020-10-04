import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_PROFILE,
  UPDATE_COMM_LIKES
} from './types'

//Get posts
export const getPosts = () => async dispatch =>{
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload:  res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
//Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/postId/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Add like
export const addLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload:{id, likes: res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Remove like
export const removeLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Delete post
export const deletePost = id => async dispatch => {
  if (window.confirm('Are you sure? This can not be undone !!! ')) {
    try {
      console.log('im in')
      await axios.delete(`/api/posts/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id
      })
      dispatch(setAlert('Post Removed', 'success'))
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }}
  
}


//Add post
export const addPost = formData => async dispatch => {
  
  try {
    const config ={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    })
    dispatch(setAlert('Post Created', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}


//Add Comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    console.log("hello1");
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    console.log("hello2");
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })
    console.log("hello3");
    dispatch(setAlert('Comment Posted', 'success')
    )
    console.log("hello4");
  } catch (err) {
    console.log("hello5");
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    console.log("hello6");
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })
    dispatch(setAlert('Comment Deleted.', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//Add comment like
export const addCommentLike = (postId, id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/commentlike/${postId}/like/${id}`);
    dispatch({
      type: UPDATE_COMM_LIKES,
      payload: { postId, id, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Remove like
export const removeCommentLike = (postId,id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/commentunlike/${postId}/unlike/${id}`);
    dispatch({
      type: UPDATE_COMM_LIKES,
      payload: { postId,id, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}