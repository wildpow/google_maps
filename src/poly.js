import React from 'react';
import { Polyline  } from 'google-maps-react';

const Poly = props => (
    <Polyline
      fillColor="#0000FF"
      fillOpacity={0.35}
      path={props.markers}
      strokeColor="#0000FF"
      strokeOpacity={0.8}
      strokeWeight={2}
    />
    

)
export default Poly