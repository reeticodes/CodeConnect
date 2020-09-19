import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import "./CommentForm.css";

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState("");

	return (
		<div className="CommentForm">
			<div>
				<h3>Leave a Comment</h3>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText("");
				}}
			>
				<textarea
					name="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<input type="submit" className value="Submit" />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
