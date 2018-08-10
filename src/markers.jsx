import React from 'react';
import { Marker } from 'google-maps-react';


const Markers = props => (
  props.markers.map((marker, index) =>
    <Marker 
      {...props}
      key={index} 
      title={marker.name}
      name={index}
      position={{lat: marker.lat, lng: marker.lng}}
      onClick={props.onMarkerClick}
    />
  )
);

export default Markers