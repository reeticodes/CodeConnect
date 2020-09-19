import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./ProfileAbout.css";

const ProfileAbout = ({ profile: { bio, skills, name } }) => (
	<div class="profile-about">
		{bio && (
			<Fragment>
				<div className="pro-bio">
					<div>{name.trim().split(" ")[0]}'s Bio</div>
					<p>{bio}</p>
				</div>
			</Fragment>
		)}
		<div className="dash-skill">
			<div>Skill Set</div>
			<div>
				{skills.map((skill, index) => (
					<div key={index}>{skill}</div>
				))}
			</div>
		</div>
	</div>
);

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
