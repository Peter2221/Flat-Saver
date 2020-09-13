import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateFlat, clearCurrent } from '../../actions/flatActions';

const EditFlatModal = ({ updateFlat, clearCurrent,  flatState: { current } }) => {
  const [flat, setFlat] = useState({
    flatname: '',
    url: '',
    price: 0,
    address: '',
    description: ''
  });

  useEffect(() => {
    if(current) {
      setFlat(current);
    }
  }, [current]);

  const onChange = e => {
    console.log(e.target);
    setFlat({
      ...flat,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(flat.flatname === '') {
      M.toast({ html: "Flat Offer Title is empty"})
    } else {
      flat.date = new Date();
      updateFlat(flat);

      M.toast({ html: "Flat Offer has been edited"})

      setFlat({
        flatname: '',
        url: '',
        price: 0,
        address: '',
        description: ''
      });

      clearCurrent();
    }
  }

  return (
    <div id="edit-flat-modal" className="modal" style={{padding: '1.5rem'}}>
      <div className="modal-content">
        <h4 style={{paddingBottom: '1rem'}}> Edit Flat Offer </h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="flatname" value={flat.flatname} onChange={onChange}/>
          </div>
          <div className="input-field">
            <input type="url" name="url" value={flat.url} onChange={onChange}/>
          </div>
          <div className="input-field">
            <input type="number" name="price" value={flat.price} onChange={onChange}/>
          </div>
          <div className="input-field">
            <input type="text" name="address" value={flat.address} onChange={onChange}/>
          </div>
          <div className="input-field">
            <textarea name="description" className="materialize-textarea" value={flat.description} onChange={onChange}></textarea>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#" className="btn blue waves-effect modal-close" onClick={onSubmit}>Edit flat offer</a>
      </div>
    </div>
  )
}

EditFlatModal.propTypes = {
  updateFlat: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  flatState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    flatState: state.flat
  }
}

export default connect(mapStateToProps, { updateFlat, clearCurrent })(EditFlatModal);
