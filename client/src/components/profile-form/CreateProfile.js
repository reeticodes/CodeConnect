import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import "./CreateProfile.css";

const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		name: " ",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: "",
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);
	const {
		name,
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<Fragment>
			<div className="CreateProfile">
				<h1>Create Your Profile</h1>
				<form className="create-profile-form" onSubmit={(e) => onSubmit(e)}>
					<div className="side__float">
						<div className="form-group">
							<input type="text" name="name" value={name} onChange={(e) => onChange(e)} />
							<span className="form-text">Name</span>
						</div>
						<div className="form-group">
							<select name="status" value={status} onChange={(e) => onChange(e)}>
								<option value="First-Year">First Year</option>
								<option value="Second-Year"> Second Year</option>
								<option value="Third-Year">Third Year</option>
								<option value="Final-Year">Final Year</option>
							</select>
							<span className="form-text">Student Year</span>
						</div>
						<div className="form-group">
							<input type="text" name="company" value={company} onChange={(e) => onChange(e)} />
							<span className="form-text">Organisation</span>
						</div>
						<div className="form-group">
							<input type="text" name="website" value={website} onChange={(e) => onChange(e)} />
							<span className="form-text">Website</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Boston, MA"
								name="location"
								value={location}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">City & State</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="HTML5, CSS3, JavaScript"
								name="skills"
								value={skills}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Coding Skills</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="harshcut"
								name="githubusername"
								value={githubusername}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Github Username</span>
						</div>
						<div className="form-group">
							<textarea name="bio" value={bio} onChange={(e) => onChange(e)}></textarea>
							<span className="form-text">Bio</span>
						</div>
					</div>
					<div className="one__line__center">
						<button type="submit" className="confirm__changes">
							Submit
						</button>
					</div>
				</form>
			</div>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
