import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProfileItem.css";

const ProfileItem = ({
	profile: {
		user: { _id },
		status,
		name,
		avatar,
		company,
		location,
		skills,
	},
}) => {
	return (
		<div className="profile">
			<Link to={`/profile/${_id}`}>
				<img src={avatar} alt="avatar" className="round-img" />
			</Link>
			<span>
				<Link to={`/profile/${_id}`}>{name}</Link>
			</span>
			<span>{status}</span>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
