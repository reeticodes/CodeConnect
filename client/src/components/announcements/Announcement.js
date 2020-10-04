import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getAnnouncements} from '../../actions/announcements'
import Spinner from "../layout/Spinner";
import AnnouncementItem from "./AnnouncementItem";
import { Button } from "reactstrap";


const Announcements = ({ auth, getAnnouncements, announcement:{announcements, loading}}) => {


  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  return loading ? (
    <Spinner/> ) : (
      <Fragment>

        {!auth.loading && auth.user.admin == true && (<Link to='/createAnnouncement'><button>Create Announcement</button></Link> )}
        <div>
          {announcements.map((announcement) => (
            <AnnouncementItem key={announcement._id} announcement={announcement} />
          ))}
        </div>
        
      </Fragment>
    );
  
    };
    Announcements.propTypes = {
      getAnnouncements: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired,
    }
const mapStateToProps = (state) => ({
  announcement: state.announcement,
  auth: state.auth
});
export default connect(mapStateToProps, {getAnnouncements})(Announcements);