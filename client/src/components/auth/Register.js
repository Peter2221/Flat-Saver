import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useHistory } from 'react-router-dom';

const Register = ({ register, auth: { isAuthenticated, error } }) => {
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
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
  });

  const { username, email, passwordOne, passwordTwo } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(username === '' || email === '' || passwordOne === '' || passwordTwo === '') {
      M.toast({ html: "Please fill in all fields"});
    } else if (passwordOne !== passwordTwo){
      M.toast({ html: "Passwords are not the same", classes: "red darken-3" });
    } else {
      const userToRegister = {
        username,
        email,
        password: passwordOne
      }
  
      register(userToRegister);
  
      setUser({
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: ''
      });
    }
  }

  return (
    <div style={formStyle} className="row grey lighten-5">
      <form className="col s12" onSubmit={onSubmit}>
      <div className="row">
          <div className="input-field">
            <input type="text" name="username" value={username} onChange={onChange}/>
            <label htmlFor="username" className="active">
              Username
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="email" name="email" className="validate" value={email} onChange={onChange}/>
            <label htmlFor="email" className="active">
              Email
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input className="validate" type="password" name="passwordOne" value={passwordOne} onChange={onChange}/>
            <label htmlFor="password" className="active">
              Password
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input className="validate" type="password" name="passwordTwo" value={passwordTwo} onChange={onChange}/>
            <label htmlFor="passwordTwo" className="active">
              Repeat password
            </label>
          </div>
        </div>
        <div className="row">
          <button className="col offset-s3 s6 btn btn-large waves-effect blue">Register</button>
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

export default connect(mapStateToProps, { register })(Register);
