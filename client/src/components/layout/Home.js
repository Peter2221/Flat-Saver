import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

import AddFlatBtn from '../layout/AddFlatBtn';
import AddFlatModal from '../flats/AddFlatModal';
import FlatOfferList from '../flats/FlatOfferList';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Fragment>
      <SearchBar />
      <FlatOfferList />
      <AddFlatModal />
      <AddFlatBtn />
    </Fragment>
  )
}

Home.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(Home);
