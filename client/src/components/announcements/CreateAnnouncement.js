import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAnnouncement } from "../../actions/announcements";


const AnnouncementForm = ({addAnnouncement}) => {
  let [title, settitle] = useState("");
  let [desc, setdesc] = useState("");


  return (
    <Fragment>
      <Link to='/posts'><button>Go back to Feed</button></Link>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        addAnnouncement({ title, desc });
        settitle( title );
        setdesc( desc );
      }}>
        <textarea value={title} name="title" placeholder="Type a Title" cols="90" rows="20" onChange={(e) => { settitle(e.target.value) }}
          required></textarea>
        <textarea value={desc} onChange={(e) => { setdesc(e.target.value) }} name="desc" id="" cols="30" rows="30"></textarea>
          <input type="submit" name="Submit" />
      </form>
    </Fragment>
    
  )
};

AnnouncementForm.propTypes = {
  addAnnouncement : PropTypes.func.isRequired,
}
export default connect(null, {addAnnouncement})(AnnouncementForm)