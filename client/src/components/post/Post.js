import React, { Fragment as div, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "./CommentItem";
import "./Post.css";

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match.params.id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			
			<div className="comment-section">
				<div>
					<Link to="/posts" className="back-to-head">
						Back To Feed
					</Link>
				</div>
				<PostItem post={post} showActions={false} />
				<CommentForm postId={post._id} />
				<div>
					{post.comments.map((comment) => (
						<CommentItem
							key={comment._id}
							comment={comment}
							postId={post._id}
						/>
					))}
				</div>
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
