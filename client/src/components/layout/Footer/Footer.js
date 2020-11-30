import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<div id="footer">
			<div id="footer-title">
				<span className="outlined">CODE</span> CONNECT
			</div>
			<div id="footer-links">
				
				<a href=".">CREATE ACCOUNT</a>
				<a href="https://opensource.org/licenses/MIT" target="_blank">
					LICENCE
				</a>
				<a href="https://github.com/reeticodes/CodeConnect/issues" target='_blank'>FEEDBACK</a>
				<a href="https://nhitm.ac.in/" target="_blank">
					NEW HORIZON
				</a>
			</div>
			<div className="made__by">
				Made by <a href="https://github.com/reeticodes" target="_blank" rel="noopener noreferrer">Reeti</a>{", "}
				<a href="https://github.com/harshcut/" target="_blank" rel="noopener noreferrer">Harsh</a> and{" "}
				<a href="https://github.com/PushkarajKulkarni" target="_blank" rel="noopener noreferrer">Pushkaraj</a>
			</div>
		</div>
	);
}

export default Footer;
