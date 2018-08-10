import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import mapStyles from './mapStyles.json';

const defaultMapOptions = {
  styles: mapStyles
};
class GoogleMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
   
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  mapClicked(mapProps, map, clickEvent) {
    console.log('mapProps',mapProps)
    console.log('map', map)
  console.log('clickEvent',clickEvent)
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
        defaultOptions={defaultMapOptions}
        styles = {mapStyles}
        xs={ 12 }
        style={style}
        google = { this.props.google }
        onClick={this.mapClicked }
        zoom={ 16.6 }
        initialCenter={{ lat: 47.905314, lng: -122.241732 }}
      >
        <Marker
          animation={ this.props.google.maps.Animation.DROP}
          onClick={ this.onMarkerClick }
          title={ 'Changing Colors Garage' }
          position={{ lat: 47.905314, lng: -122.241732 }}
          name={ 'Changing Colors Garage' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        <h3>Hello World</h3>
        </InfoWindow>
      </Map>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw')
})(GoogleMapContainer)