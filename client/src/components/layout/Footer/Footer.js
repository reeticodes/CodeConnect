import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<div id="footer">
			<div id="footer-title">
				<span className="outlined">CODE</span> CONNECT
			</div>
			<div id="footer-links">
				<a href=".">HOME</a>
				<a href=".">SIGN IN</a>
				<a href=".">CREATE ACCOUNT</a>
				<a href="https://opensource.org/licenses/MIT" target="_blank">
					LICENCE
				</a>
				<a href="#">FEEDBACK</a>
				<a href="https://nhitm.ac.in/" target="_blank">
					NEW HORIZON
				</a>
			</div>
			<div className="made__by">
				Made by <a href="https://github.com/reeticodes">Reeti</a>,{" "}
				<a href="https://github.com/harshcut/">Harsh</a> and{" "}
				<a href="https://github.com/PushkarajKulkarni">Pushkaraj</a>
			</div>
		</div>
	);
}

export default Footer;
