import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfilePosts from "./ProfilePosts";
import "./Profile.css";

const Profile = ({ match, getProfileById, auth, profile: { profile, loading, user } }) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match]);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div id="dash-con">
						<div>
							<span className="page-headers">Dashboard</span>
						</div>
						<div>
							<ProfileTop profile={profile} />
							<ProfileAbout profile={profile} />
						</div>
						{profile.githubusername && <ProfileGithub username={profile.githubusername} />}
						<div className="user-post-sec">
							<ProfilePosts userid={profile.user._id}></ProfilePosts>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
