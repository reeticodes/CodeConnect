import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import open from "../../img/open.svg";
import "./PostForm.css";
import Announcement from "../announcements/Announcement";

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");

	return (
		<div className="post-form">
			<div className="compose-section">
				<span className="page-headers">Compose</span>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						addPost({ text });
						setText("");
					}}
				>
					<textarea
						name="text"
						cols="30"
						rows="5"
						placeholder="Create a post"
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
			<div className="announcement-section">
				<span className="page-headers">Announcements</span>
				<div>
					<Announcement/>
				</div>
			</div>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
