import React,{useState, Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { createProfile } from '../../actions/profile'
import './CreateProfile.css';

const CreateProfile = ({createProfile, history}) => {
  const [formData,setFormData] = useState({
    name: ' ',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    name,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData,history)
  }

  return (
    <Fragment>
    
    <div className="CreateProfile">
    <a href="/" className="back-to-head">Go Back</a>
      <h1>
        Create Your Profile
      </h1>
      <form className="form" onSubmit={e=> onSubmit(e)}>
      <div className="form-group">
        <input type="text" name="name" value={name} onChange={e => onChange(e)} />
        <span className="form-text">Name</span>
      </div>
      <div className="form-group">
      <select name="status" value ={status} onChange={e => onChange(e)} >
            {/* <option value="0">* Select Year</option> */}
            <option value="First-Year">First Year</option>
            <option value="Second-Year"> Second Year</option>
            <option value="Third-Year">Third Year</option>
            <option value="Final-Year">Final Year</option>
          </select>
          <span className="form-text"
            >Student Year</span
          >
        </div>
        <div className="form-group">
          <input type="text" name="company" value ={company} onChange={e => onChange(e)} />
          <span className="form-text"
          >Are you an intern too? Mention the company</span
          >
        </div>
        <div className="form-group">
          <input type="text" name="website" value ={website} onChange={e => onChange(e)} />
          <span className="form-text"
            >Protofolio website</span
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Boston, MA" name="location" value ={location} onChange={e => onChange(e)} />
          <span className="form-text"
            >City & State</span
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="c, c++, html" name="skills" value ={skills} onChange={e => onChange(e)} />
          <span className="form-text"
            >Coding Skills</span
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="@codeconnect"
            name="githubusername"
            value ={githubusername} onChange={e => onChange(e)}
          />
          <span className="form-text"
            >Github username</span
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value ={bio} onChange={e => onChange(e)}></textarea>
          <span className="form-text">Bio</span>
        </div>

        <div className="tc">
          <button onClick={()=> toggleSocialInputs(!displaySocialInputs)} type="button" className="rounded-social">
            Social Media
          </button>
        </div>
        {displaySocialInputs&&
        <Fragment>
          <div className="form-group social-input">
          <i class="fa fa-twitter"></i>
          <input type="text" placeholder="https://twitter.com/" name="twitter" value ={twitter} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
        <i class="fa fa-facebook-official"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value ={facebook} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
        <i class="fa fa-youtube-play"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value ={youtube} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
        <i class="fa fa-linkedin-square"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value ={linkedin} onChange={e => onChange(e)} />
        </div>

        <div className="form-group social-input">
        <i class="fa fa-instagram"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value ={instagram} onChange={e => onChange(e)} />
        </div>
          </Fragment>}
        
        <button type="submit" className="cover-black-btn">Submit</button>
        
      </form>
      </div>
    </Fragment>
  )
}

CreateProfile.propTypes = {
createProfile : PropTypes.func.isRequired,
}

export default connect(null, {createProfile})(withRouter(CreateProfile))
