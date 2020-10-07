import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import ham_open from "../../img/ham-open.svg";
import ham_close from "../../img/ham-close.svg";
import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	let [isMinNavOpen, setMinNavOpen] = useState(false);

	const authLinks = (
		<div className="authLinks">
			<span>
				<Link to="/posts">FEED</Link>
				<Link to="/profiles">STUDENTS</Link>
			</span>
			<span>
				<Link to="/dashboard">DASHBOARD</Link>

				<Link to="/" onClick={logout}>
					LOGOUT
				</Link>
			</span>
		</div>
	);

	const guestLinks = (
		<div className="guestLinks">
			<ul>
				<li>
					<Link to="/">HOME</Link>
				</li>
				<li>
					<Link to="/register">REGISTER</Link>
				</li>
				<li>
					<Link to="/profiles">STUDENTS</Link>
				</li>
				<li>
					<a href="https://nhitm.ac.in/" target="_blank" rel="noopener">
						NEW HORIZON
					</a>
				</li>
			</ul>
		</div>
	);

	return (
		<div>
			<div className="top-panel">
				<span>{isAuthenticated ? null : <Link to="/">SIGN IN</Link>}</span>
				<span>
					{isAuthenticated ? (
						<a href="#!" onClick={logout}>
							SIGN OUT
						</a>
					) : (
						<Link to="/register">CREATE ACCOUNT</Link>
					)}
				</span>
			</div>
			<nav className="navbar">
				{isMinNavOpen ? (
					<img src={ham_close} className="min__nav" onClick={() => setMinNavOpen(!isMinNavOpen)} />
				) : (
					<img src={ham_open} className="min__nav" onClick={() => setMinNavOpen(!isMinNavOpen)} />
				)}
				<span id="title">
					<Link to="/">
						<span className="outlined">CODE</span> CONNECT
					</Link>
				</span>
				{!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
			</nav>
			{isMinNavOpen ? (
				<div className="min__nav__content">
					<Link to="/">FEED</Link>
					{isAuthenticated ? "" : <Link to="/register">REGISTER</Link>}
					<Link to="/profiles">STUDENTS</Link>
					{isAuthenticated ? <Link to="/dashboard">DASHBOARD</Link> : ""}
					<a href="https://nhitm.ac.in/" target="_blank" rel="noopener">
						NEW HORIZON
					</a>
					{isAuthenticated ? (
						<a href="#!" onClick={logout}>
							LOGOUT
						</a>
					) : (
						""
					)}
				</div>
			) : null}
		</div>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
