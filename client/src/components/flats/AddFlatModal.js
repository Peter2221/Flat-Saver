import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux';
import { addFlat } from '../../actions/flatActions';

const AddFlatModal = ({ addFlat }) => {
  const [flat, setFlat] = useState({
    flatname: '',
    url: '',
    price: 0,
    address: '',
    description: ''
  });

  const onChange = e => {
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
      addFlat(flat);

      setFlat({
        flatname: '',
        url: '',
        price: 0,
        address: '',
        description: ''
      });
    }
  }

  return (
    <div id="add-flat-modal" className="modal" style={{padding: '1.5rem'}}>
      <div className="modal-content">
        <h4 style={{paddingBottom: '1rem'}}> Add Flat Offer </h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="flatname" value={flat.flatname} onChange={onChange}/>
            <label htmlFor="flatname" className="active">
              Flat Offer Title
            </label>
          </div>
          <div className="input-field">
            <input type="url" name="url" value={flat.url} onChange={onChange}/>
            <label htmlFor="url" className="active">
              Flat URL
            </label>
          </div>
          <div className="input-field">
            <input type="number" name="price" value={flat.price} onChange={onChange}/>
            <label htmlFor="price" className="active">
              Flat price $$$
            </label>
          </div>
          <div className="input-field">
            <input type="text" name="address" value={flat.address} onChange={onChange}/>
            <label htmlFor="address" className="active">
              Address
            </label>
          </div>
          <div className="input-field">
            <textarea name="description" className="materialize-textarea" value={flat.description} onChange={onChange}></textarea>
            <label htmlFor="description" className="active">
              Description
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#" className="btn blue waves-effect modal-close" onClick={onSubmit}>Add flat offer</a>
      </div>
    </div>
  )
}

export default connect(null, { addFlat })(AddFlatModal);
