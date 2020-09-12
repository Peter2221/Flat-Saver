import React from 'react'

const FlatOfferListItem = ({ flat }) => {
  const { flatname, url, description, address, price } = flat;

  const showLocation = () => {
    const link = 'https://www.google.com/maps/search/?api=1&query=';
    const parametersEncoded = encodeURIComponent(address);
    const mapsLink = link + parametersEncoded;
    window.open(mapsLink, "_blank"); 
  }

  return (
    <div className="row">
      <div className="col l12">
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
              <a className="btn-floating waves-effect waves-light blue" style={{marginRight: '5px'}}><i className="material-icons">edit</i></a>
              <a className="btn-floating waves-effect waves-light red"><i className="material-icons">delete</i></a>
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

export default FlatOfferListItem;
