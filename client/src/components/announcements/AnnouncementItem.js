import React,{Fragment} from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import {deleteAnnouncement} from '../../actions/announcements'


const AnnouncementItem = ({
  auth, 
  deleteAnnouncement,
  announcement : {title,desc,_id, date},
  showActions
}) => (
  <Fragment>
      <h3>{title}</h3>
      <p>{desc}</p>
      <p>Posted on <Moment format="YYYY/MM/DD">{date}</Moment> </p>
      {!auth.loading && auth.user.admin === true && (
        <button onClick={()=> deleteAnnouncement(_id)}>DELETE</button>
      )}
  </Fragment>
);
AnnouncementItem.defaultProps = {
  showActions : true,
};
AnnouncementItem.propTypes ={
  announcement: PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired,
  deleteAnnouncement: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {deleteAnnouncement})(AnnouncementItem);