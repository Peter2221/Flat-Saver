import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  });

  return (
    <div>
      <h1> Homepage </h1>
    </div>
  )
}

Home.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(Home);
