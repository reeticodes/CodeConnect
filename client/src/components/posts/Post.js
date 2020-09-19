import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import tada from "../../img/tada.png";
import "./Post.css";

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className="feed-space">
				<PostForm />
				<div id="workspace">
					<span className="page-headers recent">Recent Activity</span>
					<div className="posts">
						{posts.map((post) => (
							<PostItem key={post._id} post={post} />
						))}
						<div className="end-of-feed">
							<img src={tada} alt="tada" height="81px" width="81px" />
							<span>That's everything we found for you, for now.</span>
							<span>Come back soon to see what we find next.</span>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
