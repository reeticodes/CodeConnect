import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<div className="authLinks">
			<span>
				<Link to="/profiles">STUDENTS</Link>
				<Link to="/posts">FEED</Link>
			</span>
			<span>
				<Link to="/dashboard">DASHBOARD</Link>
				<a href="#!" onClick={logout}>
					LOGOUT
				</a>
			</span>
		</div>
	);

	const guestLinks = (
		<div className="guestLinks">
			<ul>
				<li>
					<Link>HOME</Link>
				</li>
				<li>
					<Link to="/register">REGISTER</Link>
				</li>
				<li>
					<Link to="/profiles">STUDENTS</Link>
				</li>
				<li>
					<Link>GITHUB</Link>
				</li>
			</ul>
		</div>
	);

	return (
		<div>
			<div className="top-panel">
				<span>{isAuthenticated ? null : "SIGN IN"}</span>
				<span>
					{isAuthenticated ? (
						<a href="#!" onClick={logout}>
							SIGN OUT
						</a>
					) : (
						"CREATE ACCOUNT"
					)}
				</span>
			</div>
			<nav className="navbar">
				<span id="title">
					<Link to="/">
						<span className="outlined">CODE</span> CONNECT
					</Link>
				</span>
				{!loading && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				)}
			</nav>
		</div>
	);
};                   
Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth ,
});

export default connect(mapStateToProps, { logout })(Navbar);
