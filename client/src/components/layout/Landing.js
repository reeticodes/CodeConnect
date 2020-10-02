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
				<p>GET HELP FROM PEERS AND EXCEL IN CODE.</p>
			</div>
			<div className="land-shade">
				<div>Lorem ipsum dolor sit amet eiusmod tempor</div>
				<div>Consectetur adipiscing elit sed do</div>
				<div>Quis nostrud exercitation ullamco laboris</div>
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
