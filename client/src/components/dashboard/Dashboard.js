import React, { useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
// import DashboardActions from './DashboardActions';
import { getCurrentProfile } from "../../actions/profile";

import CreateProfile from "../profile-form/CreateProfile";

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading, id } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			{profile !== null ? (
				<Redirect to={`/profile/${user._id}`} />
			) : (
				<Fragment>
					<CreateProfile />
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
