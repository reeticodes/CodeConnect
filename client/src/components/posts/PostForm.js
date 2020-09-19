import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import open from "../../img/open.svg";
import "./PostForm.css";

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
					<div className="announcement-item">
						<h4>
							<img src={open} alt="!" />
							Experimental Build
						</h4>
						<span className="span-15x">
							This is a code sharing platform for students. Connect with your
							peer and excel in coding. Discuss about lated technologies and
							improve your skills. To contribute to this project visit our
							GitHub organisation.
						</span>
					</div>
					<div className="announcement-item">
						<h4>
							<img src={open} alt="!" />
							Contribution Guidelines
						</h4>
						<span className="span-15x">
							This is a code sharing platform for students. Connect with your
							peer and excel in coding. Discuss about lated technologies and
							improve your skills. To contribute to this project visit our
							GitHub organisation.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
