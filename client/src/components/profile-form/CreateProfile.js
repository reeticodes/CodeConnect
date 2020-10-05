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
							<input
								type="text"
								placeholder="First Name Last Name"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Name</span>
						</div>
						<div className="form-group">
							<select name="status" value={status} onChange={(e) => onChange(e)}>
								<option value="First Year">First Year</option>
								<option value="Second Year"> Second Year</option>
								<option value="Third Year">Third Year</option>
								<option value="Final Year">Final Year</option>
							</select>
							<span className="form-text">Student Year</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="company"
								placeholder="Organisation"
								value={company}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Intern at</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="website"
								value={website}
								placeholder="https://"
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Website</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Mumbai"
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
							<span className="form-text">Skill Set</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="octocat"
								name="githubusername"
								value={githubusername}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Github Username</span>
						</div>
						<div className="form-group">
							<textarea
								name="bio"
								placeholder="..."
								value={bio}
								onChange={(e) => onChange(e)}
							></textarea>
							<span className="form-text">Bio</span>
						</div>
					</div>
					<div className="one__line__center">
						<button
							onClick={() => toggleSocialInputs(!displaySocialInputs)}
							type="button"
							className="adobe__primary"
						>
							{displaySocialInputs ? "Collapse Social Media Links" : "Expand Social Media Links"}
						</button>
					</div>
					<div className="side__float">
						{displaySocialInputs && (
							<Fragment>
								<div className="form-group social-input">
									<i class="fa fa-twitter"></i>
									<input
										type="text"
										placeholder="https://twitter.com/"
										name="twitter"
										value={twitter}
										onChange={(e) => onChange(e)}
									/>
								</div>

								<div className="form-group social-input">
									<i class="fa fa-facebook-official"></i>
									<input
										type="text"
										placeholder="https://facebook.com/"
										name="facebook"
										value={facebook}
										onChange={(e) => onChange(e)}
									/>
								</div>

								<div className="form-group social-input">
									<i class="fa fa-youtube-play"></i>
									<input
										type="text"
										placeholder="https://youtube.com/"
										name="youtube"
										value={youtube}
										onChange={(e) => onChange(e)}
									/>
								</div>

								<div className="form-group social-input">
									<i class="fa fa-linkedin-square"></i>
									<input
										type="text"
										placeholder="https://linkedin.com/"
										name="linkedin"
										value={linkedin}
										onChange={(e) => onChange(e)}
									/>
								</div>

								<div className="form-group social-input">
									<i class="fa fa-instagram"></i>
									<input
										type="text"
										placeholder="https://instagram.com/"
										name="instagram"
										value={instagram}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</Fragment>
						)}
					</div>
					<div className="one__line__center">
						<button type="submit" className="github__primary">
							Create Profile
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
