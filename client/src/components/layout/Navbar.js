import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout, clearErrors } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, clearErrors, auth: { isAuthenticated } }) => {

  const onLogout = () => {
    logout();
    clearErrors();
  }

  return (
    <nav className="blue">
      <div className="nav-wrapper container">
        <a href="#" className="brand-logo">FlatSaver</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            isAuthenticated ? (
              <Fragment>
                <li onClick={onLogout}>
                  <a href="#" style={logoutStyle}>Logout<i className="material-icons" style={{marginLeft: '2px', fontSize: '1.5rem'}}>exit_to_app</i></a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </Fragment>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

const logoutStyle = {
  display: 'flex',
  alignItems: 'center'
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout, clearErrors })(Navbar);
