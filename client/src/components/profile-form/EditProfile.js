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
	profile: { profile, loading },
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
			twitter: loading || !profile.social ? "" : profile.social.twitter,
			facebook: loading || !profile.social ? "" : profile.social.facebook,
			linkedin: loading || !profile.social ? "" : profile.social.linkedin,
			youtube: loading || !profile.social ? "" : profile.social.youtube,
			instagram: loading || !profile.social ? "" : profile.social.instagram,
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

				<form
					className="form"
					onSubmit={(e) => {
						onSubmit(e);
					}}
				>
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
								<option value="0">Select Year</option>
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
								placeholder="Intern at"
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
								placeholder="https://"
								name="website"
								value={website}
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
							<span className="form-text">Location</span>
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
							<span className="form-text">GitHub Username</span>
						</div>
						<div className="form-group">
							<textarea
								placeholder="..."
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
					<div className="horizontal__group__danger">
						<button type="submit" className="github__primary">
							Update Changes
						</button>
						<Link id="back-acc" to="/dashboard">
							<button className="github__neutral">Go Back</button>
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
