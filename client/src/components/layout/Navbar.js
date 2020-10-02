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
			
				<Link to="/" onClick={logout}>LOGOUT</Link>
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
				{isMinNavOpen ? (
					<img
						src={ham_close}
						className="min__nav"
						onClick={() => setMinNavOpen(!isMinNavOpen)}
					/>
				) : (
					<img
						src={ham_open}
						className="min__nav"
						onClick={() => setMinNavOpen(!isMinNavOpen)}
					/>
				)}
				<span id="title">
					<Link to="/">
						<span className="outlined">CODE</span> CONNECT
					</Link>
				</span>
				{!loading && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				)}
			</nav>
			{isMinNavOpen ? (
				<div className="min__nav__content">
					<a href=".">FEED</a>
					<a href=".">STUDENTS</a>
					<a href=".">DASHBOARD</a>
					<a href=".">LOGOUT</a>
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
