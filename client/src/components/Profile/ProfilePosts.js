import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getprofileposts } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
// import "../posts/Post.css";
import "./ProfilePosts.css";

const ProfilePosts = ({   isAuthenticated,getprofileposts, profile, post: { posts, loading }, userid }) => {
	const noposts = false;
	useEffect(() => {
		
		getprofileposts(userid);
		
	}, [getprofileposts]);


	return loading ? (
		<Spinner />
	) : (isAuthenticated && posts.length>0 && 	<Fragment>
			<div className="ProfilePosts">
				<span className="page-headers">User's Posts</span>
				<div className="posts">
					{posts.map((post) => (
						<PostItem key={post._id} post={post} />
					))}
				</div>
			</div>
		</Fragment>

	);
};

ProfilePosts.propTypes = {
	getprofileposts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	post: state.post,
	profile: state.profile,
	
});

export default connect(mapStateToProps, { getprofileposts })(ProfilePosts);
