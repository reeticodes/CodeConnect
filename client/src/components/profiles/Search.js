import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { setAlert } from "../../actions/alert";
import { filterSearch } from "../../actions/profile";
import { connect } from "react-redux";
import "./searchbar.css";

const SearchBar = ({ setAlert, filterSearch }) => {
	const [text, setText] = useState(" ");

	const OnChange = (e) => setText(e.target.value);

	const OnSubmit = async (e) => {
		console.log("im here");
		e.preventDefault();
		if (text == " ") {
			setAlert("Please Enter Something", "danger");
		} else {
			filterSearch(text);
			console.log("im here3");
		}
	};

	return (
		<Fragment>
			<form className="search-section" onSubmit={(e) => OnSubmit(e)}>
				<input
					className="searchInput"
					onChange={(e) => OnChange(e)}
					name="text"
					value={text}
					type="text"
				/>
				<button class="searchButton" type="submit">
					<i className="fa fa-search" />
				</button>
			</form>
		</Fragment>
	);
};
SearchBar.propTypes = {
	filterSearch: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, filterSearch })(SearchBar);
