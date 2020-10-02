import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile, deleteAccount } from "../../actions/profile";
import "./EditProfile.css";
import DeleteModal from "./DeleteModal";

const EditProfile = ({
	createProfile,
	history,
	deleteAccount,
	getCurrentProfile,
	profile:{profile,loading}
}) => {
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

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			name: loading || !profile.name ? "" : profile.name,
			company: loading || !profile.company ? "" : profile.company,
			website: loading || !profile.website ? "" : profile.website,
			location: loading || !profile.location ? "" : profile.location,
			status: loading || !profile.status ? "" : profile.status,
			skills: loading || !profile.skills ? "" : profile.skills,
			githubusername: loading || !profile.githubusername ? "" : profile.githubusername,
			bio: loading || !profile.bio ? "" : profile.bio,
			twitter: loading || !profile.twitter ? "" : profile.twitter,
			facebook: loading || !profile.facebook ? "" : profile.facebook,
			linkedin: loading || !profile.linkedin ? "" : profile.linkedin,
			youtube: loading || !profile.youtube ? "" : profile.youtube,
			instagram: loading || !profile.instagram ? "" : profile.instagram,
		});
	}, [loading, getCurrentProfile]);

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
		createProfile(formData, history, true);
	};

	return (
		<div className="EditProfile">
			<Fragment>
				{profile !== null ? (
					<Fragment>
						<h1>Account Settings</h1>
					</Fragment>
				) : (
					<Fragment>
						<h1>Profile Setup</h1>
					</Fragment>
				)}

				<form className="form" onSubmit={(e) => {
					onSubmit(e)
					}}>
					<div className="side__float">
						<div className="form-group">
							<input
								type="text"
								placeholder="Name"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Name</span>
						</div>
						<div className="form-group">
							<select name="status" value={status} onChange={(e) => onChange(e)}>
								<option value="0">Select Year</option>
								<option value="First-Year">First Year</option>
								<option value="Second-Year"> Second Year</option>
								<option value="Third-Year">Third-Year</option>
								<option value="Final-Year">Final-Year</option>
							</select>
							<span className="form-text">Student Year</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Intern at?"
								name="company"
								value={company}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Organistion</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Personal Website"
								name="website"
								value={website}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Website</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Location"
								name="location"
								value={location}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Location</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="c, c++, javascript"
								name="skills"
								value={skills}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">Skill Set</span>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Github Username"
								name="githubusername"
								value={githubusername}
								onChange={(e) => onChange(e)}
							/>
							<span className="form-text">GitHub Username</span>
						</div>
						<div className="form-group">
							<textarea
								placeholder="A short bio of yourself"
								name="bio"
								value={bio}
								onChange={(e) => onChange(e)}
							></textarea>
							<span className="form-text">About</span>
						</div>
					</div>
					<div className="one__line__center">
						<button
							onClick={() => toggleSocialInputs(!displaySocialInputs)}
							type="button"
							id="drop-social"
							className="social__media"
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
										placeholder="Twitter URL"
										name="twitter"
										value={twitter}
										onChange={(e) => onChange(e)}
									/>
								</div>
								<div className="form-group social-input">
									<i class="fa fa-facebook-official"></i>
									<input
										type="text"
										placeholder="Facebook URL"
										name="facebook"
										value={facebook}
										onChange={(e) => onChange(e)}
									/>
								</div>
								<div className="form-group social-input">
									<i class="fa fa-youtube-play"></i>
									<input
										type="text"
										placeholder="YouTube URL"
										name="youtube"
										value={youtube}
										onChange={(e) => onChange(e)}
									/>
								</div>

								<div className="form-group social-input">
									<i class="fa fa-linkedin-square"></i>
									<input
										type="text"
										placeholder="Linkedin URL"
										name="linkedin"
										value={linkedin}
										onChange={(e) => onChange(e)}
									/>
								</div>
								<div className="form-group social-input">
									<i class="fa fa-instagram"></i>
									<input
										type="text"
										placeholder="Instagram URL"
										name="instagram"
										value={instagram}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</Fragment>
						)}
					</div>
					<div className="one__line__center">
						<button type="submit" className="confirm__changes">
							Update Changes
						</button>
						<Link id="back-acc" to="/dashboard">
							<button className="head__back">Go Back</button>
						</Link>
						<DeleteModal deleteAccount={deleteAccount} />
					</div>
				</form>
			</Fragment>
		</div>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
});
export default connect(mapStateToProps, {
	createProfile,
	getCurrentProfile,
	deleteAccount,
})(withRouter(EditProfile));
