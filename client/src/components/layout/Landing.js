import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Landing.css";
import hero from "../../img/cover-hero.svg";
import Login from "../Auth/Login";

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/posts" />;
	}
	return (
		<div className="Landing">
			<div>
				<div>
					<div>
						<Login />
					</div>
					<div>
						<img src={hero} alt="hero" />
					</div>
				</div>
			</div>
			<div className="banner-text">
				<p>CONNECT & COLLAB WITH NEW HORIZON COMMUNITY.</p>
			</div>
			<div className="land-shade">
				<div>Get help from peers and excel in code</div>
				<div>Stay updated with recent technologies</div>
				<div>New Horizon Computer Department at a glance</div>
			</div>
		</div>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
