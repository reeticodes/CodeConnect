import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import "./ProfileTop.css";
import { followUser, unfollowUser, getFolllowers, getFollowing } from "../../actions/profile";
import { connect } from "react-redux";
import adminlogo from '../../img/icons8-user-shield-64.ico'


const ProfileTop = ({
	isAuthenticated,
	followUser,
	unfollowUser,
	auth,
	profile: { user, followers, following, status, company, location, website, social, name, avatar },
}) => {
	let [isFollowed, setFollow] = useState(false);

	useEffect(() => {
		if(isAuthenticated)
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
			<h3>{name} {user.admin === true && <Fragment><img src={adminlogo} alt="admin logo" style={{height: '30px'}, {width:'30px'}}/></Fragment>}</h3>
			<div className="followtag">
				<svg
					text="gray-light"
					height="16"
					class="octicon octicon-people text-gray-light"
					viewBox="0 0 16 16"
					version="1.1"
					width="16"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"
					></path>
				</svg>{" "}
				<Link to={`/profile/followers/${user._id}`}>
					{followers.length} {followers.length == 1 ? "follower" : "followers"}
				</Link>
				{"·"}
				<Link to={`/profile/following/${user._id}`}>{following.length} following</Link>
			</div>
			{isAuthenticated && user._id !== auth.user._id && (
				<Fragment>{isFollowed ? Followed : NotFollowed}</Fragment>
			)}
			<div className="vertical__group__center">
				{" "}
				{isAuthenticated && auth.loading === false && auth.user._id === user._id && (
					<Link to="/edit-profile" className="github__neutral">
						Edit Profile
					</Link>
				)}
			</div>

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
