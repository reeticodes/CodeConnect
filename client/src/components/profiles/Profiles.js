import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import './Profiles.css';
import SearchBar from './Search'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? <Spinner /> :
        <Fragment>
          <div className='Profiles'>
            <div className="heading">
              <h1>Browse Profiles</h1>
              <div className="search"><SearchBar /></div>
            </div>
            
            
            <div className="profile-grid">
              {profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : <h4> No Profiles found... </h4>}
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
