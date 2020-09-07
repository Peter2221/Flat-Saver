import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useHistory } from 'react-router-dom';

const Login = ({ login, auth: { isAuthenticated, error } }) => {
  const history = useHistory();

  useEffect(() => {
    // Push to Home if authenticated
    if(isAuthenticated) {
      history.push('/');
    }

    if(error) {
      M.toast({ html: error, classes: 'red darken-3'});
    }

  }, [isAuthenticated, error]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(email === '' || password === '') {
      M.toast({ html: "Please fill in all fields"});
    } else {
      const userToLogin = {
        email,
        password
      }
  
      login(userToLogin);
  
      setUser({
        email: '',
        password: ''
      });
    }
  }

  const { email, password } = user;

  return (
      <div style={formStyle} className="row grey lighten-5">
        <form className="col s12" onSubmit={onSubmit}>
          <div className="row">
            <div className="input-field">
              <input type="email" name="email" value={email} className="validate" onChange={onChange} />
              <label htmlFor="email" className="active">
                Email
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input className="validate" type="password" name="password" value={password} className="validate" onChange={onChange} />
              <label htmlFor="password" className="active">
                Password
              </label>
            </div>
          </div>
          <div className="row">
            <button className="col offset-s3 s6 btn btn-large waves-effect blue">Login</button>
          </div>
        </form>
      </div>
  )
}

const formStyle = {
  padding: '2rem 4rem',
  marginTop: '4rem'
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login })(Login);
