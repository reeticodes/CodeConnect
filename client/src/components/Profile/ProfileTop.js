import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import "./ProfileTop.css";
import { followUser, unfollowUser, getFolllowers, getFollowing } from "../../actions/profile";
import { connect } from "react-redux";

const ProfileTop = ({
	isAuthenticated,
	followUser,
	unfollowUser,
	auth,
	profile: { user, followers, following, status, company, location, website, social, name, avatar },
}) => {
	let [isFollowed, setFollow] = useState(false);

	useEffect(() => {
		check();
	}, []);
	function check() {
		for (let i = 0; i < followers.length; i++) {
			if (followers[i].user.toString() === auth.user._id) {
				setFollow(true);
				return;
			}
		}
		setFollow(false);
		return;
	}
	const Followed = (
		<div>
			<button
				className="buttonunfollow"
				onClick={() => {
					setFollow(!isFollowed);
					unfollowUser(user._id);
				}}
			>
				Unfollow
			</button>
		</div>
	);
	const NotFollowed = (
		<div>
			<button
				className="buttonfollow"
				onClick={() => {
					setFollow(!isFollowed);
					followUser(user._id);
				}}
			>
				Follow
			</button>
		</div>
	);

	return (
		<div className="ProfileTop">
			<img src={avatar} alt="avatar" />
			<h3>{name}</h3>

			{isAuthenticated && user._id !== auth.user._id && (
				<Fragment>{isFollowed ? Followed : NotFollowed}</Fragment>
			)}
			<div className="button-group">
				<button>
					<Link to={`/profile/followers/${user._id}`}>Followers {followers.length}</Link>
				</button>
				<button>
					<Link to={`/profile/following/${user._id}`}>Following {following.length}</Link>
				</button>
			</div>
			{isAuthenticated && auth.loading === false && auth.user._id === user._id && (
				<Link to="/edit-profile" className="buttonunfollow">
					Edit Profile
				</Link>
			)}

			<p>{status} Student</p>
			{location && (
				<span>
					<i className="fa fa-map-marker"></i> {location}
				</span>
			)}
			<div className="icon-container">
				{website && (
					<a href={website} target="_blank" rel="noopener noreferrer">
						<i class="fa fa-globe"></i>
					</a>
				)}
				{social && social.facebook && (
					<a href={social.facebook} target="_blank" rel="noopener noreferrer">
						<i class="fa fa-facebook-official"></i>
					</a>
				)}
				{social && social.linkedin && (
					<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
						<i class="fa fa-linkedin-square"></i>
					</a>
				)}
				{social && social.instagram && (
					<a href={social.instagram} target="_blank" rel="noopener noreferrer">
						<i class="fa fa-instagram"></i>
					</a>
				)}
				{social && social.twitter && (
					<a href={social.twitter} target="_blank" rel="noopener noreferrer">
						<i class="fa fa-twitter"></i>
					</a>
				)}
				{social && social.youtube && (
					<a href={social.youtube} target="_blank" rel="noopener noreferrer">
						<i class="fa fa-youtube-play"></i>
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
	followUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	followers: state.profile.followers,
	following: state.profile.following,
	auth: state.auth,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
	followUser,
	unfollowUser,
	getFolllowers,
	getFollowing,
})(ProfileTop);
