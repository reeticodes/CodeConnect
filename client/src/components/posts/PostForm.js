import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { addAnnouncement } from "../../actions/announcements";
import "./PostForm.css";
import Announcement from "../announcements/Announcement";
import { Fragment } from "react";

const PostForm = ({ auth, addPost, addAnnouncement }) => {
	let [title, settitle] = useState("");
	let [desc, setdesc] = useState("");
	const [text, setText] = useState("");
	const [buttonState, setbuttonState] = useState(true);

	const Post = (
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
			<button className="form-end-btn" type="submit" value="Submit">
				Submit
			</button>
		</form>
	);
	const Announce = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				addAnnouncement({ title, desc });
				settitle(title);
				setdesc(desc);
			}}
		>
			<input
				value={title}
				name="title"
				placeholder="Title"
				onChange={(e) => {
					settitle(e.target.value);
				}}
				required
			/>
			<textarea
				value={desc}
				onChange={(e) => {
					setdesc(e.target.value);
				}}
				name="desc"
				id=""
				cols="30"
				rows="5"
			></textarea>
			<button className="form-end-btn" type="submit" name="Submit">
				Submit
			</button>
		</form>
	);

	return (
		<div className="post-form">
			<div className="compose-section">
				<span className="page-headers">Compose</span>
				{!auth.loading && auth.user.admin ? (
					<Fragment>
						<button className="adobe__quiet" onClick={(e) => setbuttonState(!buttonState)}>
							{buttonState ? "Switch to Announcement" : "Switch to Post"}
						</button>
					</Fragment>
				) : (
					<Fragment> {Post}</Fragment>
				)}
				{!auth.loading && auth.user.admin === true && (
					<Fragment>{buttonState ? Post : Announce}</Fragment>
				)}
			</div>
			<div className="announcement-section">
				<span className="page-headers">Announcements</span>
				<div>
					<Announcement />
				</div>
			</div>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	addAnnouncement: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addPost, addAnnouncement })(PostForm);
