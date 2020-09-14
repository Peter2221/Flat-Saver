import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getFlats } from '../../actions/flatActions';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import FlatOfferListItem from './FlatOfferListItem';

const FlatOfferList = ({ getFlats, flat: { flats, loading }}) => {
  useEffect(() => {
    getFlats();
  }, []);

  return (
    <div>
      {
        loading ? (
          <Spinner />
        ) : (
          flats !== null && 
          flats.map(flat => <FlatOfferListItem key={flat._id} flat={flat} />)
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    flat: state.flat
  }
}

FlatOfferList.propTypes = {
  getFlats: PropTypes.func.isRequired,
  flat: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getFlats })(FlatOfferList);
