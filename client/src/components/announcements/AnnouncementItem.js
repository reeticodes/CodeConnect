import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteAnnouncement } from "../../actions/announcements";
import open from "../../img/open.svg";
import "./AnnouncementItem.css";

const AnnouncementItem = ({
	auth,
	deleteAnnouncement,
	announcement: { title, desc, _id, date },
	showActions,
}) => (
	<Fragment>
		<div className="AnnouncementItem__head">
			<h3>
				<img src={open} alt="!" />
				{title}
			</h3>
			{!auth.loading && auth.user.admin === true && (
				<button className="delete__announce" onClick={() => deleteAnnouncement(_id)}>
					<span>🗑️</span>
				</button>
			)}
		</div>
		<p className="AnnouncementItem__desc">{desc}</p>
		<p className="text__small__gray">
			Posted on <Moment format="YYYY/MM/DD">{date}</Moment>{" "}
		</p>
	</Fragment>
);
AnnouncementItem.defaultProps = {
	showActions: true,
};
AnnouncementItem.propTypes = {
	announcement: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteAnnouncement: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { deleteAnnouncement })(AnnouncementItem);
