import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect } from 'react-redux';
import {setAlert} from '../../actions/alert'
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import './Register.css';

export const Register = ({setAlert, register, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '', 
    password2: ''
  });
  const {email,password,password2} = formData;


  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })


  const onSubmit = async e => {
    e.preventDefault();
    if(password!== password2){
      setAlert('Passwords do not match', 'danger');
    }else{
      register({email,password})
    }
  }

  //Redirect if registered 
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }


  return (<Fragment>
    <section className="Register">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={e => onSubmit(e)} >
        
        <div className="form-group">
          <input type="email" name="email"
            value={email}
            onChange={e => onChange(e)}
            //required
            />
          <span>Email</span>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            //minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
          <span>Password</span>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            //minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
          <span>Confirm Password</span>
        </div>
        <input type="submit" id="login-button" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/" className='underline-button supbtn'>Sign In</Link>
      </p>
    </section>
  </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,register})(Register);
