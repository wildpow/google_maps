import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

class GoogleMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        item
        xs={ 12 }
        style={style}
        google = { this.props.google }
        onClick={this.onMapClick }
        zoom={ 14 }
        initialCenter={{ lat: 39.648209, lng: -75.711185 }}
      >
        <Marker
          onClick={ this.onMarkerClick }
          title={ 'Changing Colors Garage' }
          position={{ lat: 39.648209, lng: -75.711185 }}
          name={ 'Changing Colors Garage' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        Hello World
        </InfoWindow>
      </Map>

    )
  }
}

export default GoogleApiWrapper({
  api: (process.env.googleApi)
})(GoogleMapContainer)