import React from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import { deleteFlat, setCurrent } from '../../actions/flatActions';

const FlatOfferListItem = ({ flat, deleteFlat, setCurrent }) => {
  const { flatname, url, description, address, price } = flat;

  const showLocation = () => {
    const link = 'https://www.google.com/maps/search/?api=1&query=';
    const parametersEncoded = encodeURIComponent(address);
    const mapsLink = link + parametersEncoded;
    window.open(mapsLink, "_blank"); 
  }

  const delFlat = () => {
    deleteFlat(flat._id);
    M.toast({ html: "Flat has been deleted"});
  }

  const setCurrentFlat = () => {
    setCurrent(flat);
  }

  return (
    <div className="row">
      <div className="col12">
        <div className="card">
          <div className="card-content">
            <h4 className="card-title"> {flatname} </h4>
            <ul>
              <li style={listItemStyle}>
                <i className="material-icons" style={listItemStyleIcon}>location_on</i>
                <span style={{margin: '0'}}><a href="#" onClick={showLocation}>{address}</a></span>
              </li>
              <li style={listItemStyle}>
                <i className="material-icons" style={listItemStyleIcon}>attach_money</i>
                <span> {price} {" zł"}</span>
              </li>
              <li style={listItemStyle}>
                <i className="material-icons" style={listItemStyleIcon}>link</i>
                <span><a href={url} target="_blank">Show the offer</a></span>
              </li>
            </ul>
            <p> {description} </p>
          </div>
          <div className="card-action" style={cardAction}>
            <div>
              <a href="#edit-flat-modal" className="btn-floating waves-effect waves-light blue modal-trigger" onClick={setCurrentFlat} style={{marginRight: '5px'}}><i className="material-icons">edit</i></a>
              <a className="btn-floating waves-effect waves-light red" onClick={delFlat}><i className="material-icons">delete</i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '1rem 0'
}

const listItemStyleIcon = {
  marginRight: '5px'
}

const cardAction = {
  display: 'flex',
  justifyContent: 'flex-end'
}

FlatOfferListItem.propTypes = {
  flat: PropTypes.object.isRequired,
  deleteFlat: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
}

export default connect(null, { deleteFlat, setCurrent })(FlatOfferListItem);
