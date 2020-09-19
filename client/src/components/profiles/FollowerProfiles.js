import React, { Fragment, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFolllowers, getFollowing } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import './Profiles.css';

const FollowerProfiles = ({ getFolllowers, profile: {profile: user, profiles, loading },match }) => {

  useEffect(() => {
    getFolllowers(match.params.id);
  }, [getFolllowers,match]);
   return (
    <Fragment>
      {loading? <Spinner/>:
        <Fragment>
          <div className='Profiles'>
            <h1>Followers</h1>
            <div className="profile-grid">
              {profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : <h4> No Profiles found... </h4> }
            </div>
            </div>
        </Fragment>
      }
    </Fragment>
  )
}

FollowerProfiles.propTypes = {
  getFolllowers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getFolllowers })(FollowerProfiles);
