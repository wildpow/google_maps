import React from 'react';
// import SimpleMap from './google-map-react'
// import GoogleMapContainer from './google-maps-react';
// import NewMap from './NewMap'
import MapWrapper from './auto';
const App = () => {
    return (
      <div>
        {/* <NewMap/> */}
        <MapWrapper/>
        {/* <GoogleMapContainer/> */}
        {/* <SimpleMap/> */} 
        
      </div>
    )
}
  // To switch between each working map emplementations you'll
  // need to comment one out and and uncomment the other
  //  GoogleMapContainer for google-maps-react
  // SimpleMap for google-map-react
export default App;

// {
//   "featureType": "all",
//   "elementType": "labels.text",
//   "stylers": [
//     {
//       "visibility": "off"
//     }
//   ]
// },