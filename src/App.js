import React from 'react';
import SimpleMap from './google-map-react'
import GoogleMapContainer from './google-maps-react';

const App = () => {
    return (
      <div>
        <GoogleMapContainer/>
        {/* <SimpleMap/> */} 
        <h1>Hello</h1>
      </div>
    )
}
  // To switch between each working map emplementations you'll
  // need to comment one out and and uncomment the other
  //  GoogleMapContainer for google-maps-react
  // SimpleMap for google-map-react
export default App;