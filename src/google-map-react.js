import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Logo from './logo.png';
import styled from 'styled-components';

const StyledImage = styled.img`
  max-width: 70px;
  max-height: 70px;
`;

const LogoImage = () => <div><StyledImage src={Logo} alt="this"/></div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.905314,
      lng:  -122.241732
    },
    zoom: 16.6
  };

  render() {
    return (
      <div style={{ height: '1000px', width: '1500px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCtrSnp6zJ96mxtN1PelQGLRUvW4fa0VeI' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <LogoImage
            lat={47.905562}
            lng={-122.24182}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;