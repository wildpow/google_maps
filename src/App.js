import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Logo from './logo.png';
import styled from 'styled-components';
import GoogleMapContainer from './itJustCantBeEasy'
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
    zoom: 17.5
  };

  render() {
    return (
      <div style={{ height: '350px', width: '496px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyDFQ2E_JWQ2m4FgS4kSsGqwItF_RlSlOkY' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <LogoImage
            lat={47.905562}
            lng={-122.24182}
          />
        </GoogleMapReact>
        <GoogleMapContainer/>
      </div>
    );
  }
}
//AIzaSyA2E8TFz8_HRV_zfDER69-dVoECoZqENEQ
export default SimpleMap;