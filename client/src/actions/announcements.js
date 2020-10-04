import axios from 'axios'
import {setAlert} from './alert'
import { ADD_ANNOUNCEMENT, GET_ANNOUNCEMENTS,DELETE_ANNOUNCEMENT, ANNOUNCEMENT_ERROR } from './types'



//Get announcements
export const getAnnouncements = () => async dispatch => {
  try {
    console.log("im in2");
    const res = await axios.get('/api/posts/getannouncements');
    dispatch({
      type: GET_ANNOUNCEMENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ANNOUNCEMENT_ERROR,
      payload: { msg: {err} }
    });
  }
}


//Delete announcement
export const deleteAnnouncement = id => async dispatch => {
  if (window.confirm('Are you sure? This can not be undone !!! ')) {
    try {
      
      await axios.delete(`/api/posts/announcements/${id}`);
      dispatch({
        type: DELETE_ANNOUNCEMENT,
        payload: id
      })
      
      dispatch(setAlert('Announcement Removed', 'success'));

    } catch (err) {
      dispatch({
        type: ANNOUNCEMENT_ERROR,
        payload: { msg: err}
      });
    }
  }

}
//Add Announcement
export const addAnnouncement = formData => async dispatch => {

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/posts/announcements`, formData, config);
    dispatch({
      type: ADD_ANNOUNCEMENT,
      payload: res.data
    })
    dispatch(setAlert('Announcement Created', 'success'))
  } catch (err) {
    const errors = err.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ANNOUNCEMENT_ERROR,
      payload: { msg: {err:errors} }
    });
  }
}