import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
	addCommentLike,
	removeCommentLike,
	deleteComment,
} from "../../actions/post";
import "./CommentItem.css";

const CommentItem = ({
	addCommentLike,
	removeCommentLike,
	postId,
	comment: { _id, text, name, avatar, user, date, likes },
	auth,
	deleteComment,
}) => (
	<div className="CommentItem">
		<div>
			<Link to={`/profile/${user}`}>
				<img src={avatar} alt="" />
			</Link>
			<Link to={`/profile/${user}`}>
				<span>{name}</span>
			</Link>
			<span>
				Commented on <Moment format="YYYY/MM/DD">{date}</Moment>
			</span>
		</div>
		<div>
			<p>{text}</p>
		</div>
		<div>
			<button onClick={() => addCommentLike(postId, _id)} type="button">
				<span>👍 </span>
				<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
			</button>
			<button onClick={() => removeCommentLike(postId, _id)} type="button">
				<span>👎 </span>
			</button>
			{!auth.loading && user === auth.user._id && (
				<button onClick={(e) => deleteComment(postId, _id)} type="button">
					<span>🚫</span>
				</button>
			)}
		</div>
	</div>
);

CommentItem.propTypes = {
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	addCommentLike: PropTypes.func.isRequired,
	removeCommentLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	addCommentLike,
	removeCommentLike,
	deleteComment,
})(CommentItem);
