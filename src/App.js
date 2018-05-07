import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.9050409,
      lng: -122.2413456
    },
    zoom: 20
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyA2E8TFz8_HRV_zfDER69-dVoECoZqENEQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={47.9050409}
            lng={-122.2413456}
            text={'E.S.C Mattress Center'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;