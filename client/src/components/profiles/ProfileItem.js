import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ProfileItem.css';

const ProfileItem = ({ profile: {
  user: { _id },
  status,
  name, avatar,
  company,
  location,
  skills
} }) => {
  return (
    <div className="profile">
      <div>
        <Link to={`/profile/${_id}`}>
          <img src={avatar} alt="avatar" className="round-img" />
        </Link>
      </div>
      <div className="usr-det">
        <span className="usr-name"><Link to={`/profile/${_id}`}>{name}</Link></span>
        <span>
          {location && <span><i className="fa fa-map-marker"></i>{location}</span>}
        </span>
      </div>
      {/* <div>
        {skills.slice(0,4).map((skill,index)=>
          <span className="pro-skill" key={index}>
          {skill}
          </span>
        )}
      </div> */}
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem

