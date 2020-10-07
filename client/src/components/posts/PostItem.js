import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import "./PostItem.css";

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
	showActions,
}) => (
	<div className="post">
		<div>
			<Link to={`/profile/${user}`}>
				<img src={avatar} alt="avatar" />
			</Link>
			<Link to={`/profile/${user}`}>
				<span>{name}</span>
			</Link>
			<p className="post-date">
				Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
			</p>
		</div>
		<div>
			<p>{text}</p>
		</div>
		<div>
			<button onClick={() => addLike(_id)} type="button">
				<span>👍 </span>
				<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
			</button>
			<button onClick={() => removeLike(_id)} type="button">
				<span>👎 </span>
			</button>
			<Link to={`/posts/${_id}`}>
				<button>
					<span>💬</span>
				</button>
			</Link>
			{!auth.loading && user === auth.user._id && (
				<button onClick={() => deletePost(_id)} type="button">
					<span>🗑️</span>
				</button>
			)}
		</div>
	</div>
);

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
