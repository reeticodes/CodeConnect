import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../actions/auth';
import './Login.css';


export const Login = ({login, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {  email, password } = formData;


  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })


  const onSubmit = async e => {
    e.preventDefault();
    login(email,password)
  }

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/posts"/>
  }

  return (<Fragment>
    <section className="Login">
      <h1>Sign In</h1>
      <form className="login-form" onSubmit={e => onSubmit(e)} >
        
        <div className="form-group">
          <input type="email" name="email"
            value={email}
            onChange={e => onChange(e)}
            required />
            <span>Email</span>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
          <span>Password</span>
        </div>
        <input type="submit" id='login-button' value="Confirm" />
      </form>
      <p className="my-1">
        Don't have an account?  <Link to="/register" className='underline-button' >Sign Up</Link>
      </p>
    </section>
  </Fragment>
  );
}
Login.prototypes ={
  login: PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
