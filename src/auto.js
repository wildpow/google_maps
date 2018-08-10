import React, { Component } from 'react';
import Markers from './markers';
import Map, { Marker, GoogleApiWrapper, Polyline, InfoWindow  } from 'google-maps-react';
import './css.css';
// import styles from './autocomplete.module.css';
const style = {
  width: '100%',
  height: '800px',
  position: 'relative',
  display: 'flex',
  'marginLeft': 'auto',
  'marginRight': 'auto'
}

class Contents extends Component {
  constructor(props){
    super(props)
    this.state = {
      position: null,
      markers: [],
      markerPosition: null,
      initialCenter: {lat: 46.9282, lng: -121.5045},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.saveMarker = this.saveMarker.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }
 

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }
  saveMarker(){
    let newWayPoint = {
      lat: this.state.markerPosition.lat,
      lng: this.state.markerPosition.lng,
    };
    this.setState({ markers: [...this.state.markers, newWayPoint],});
  };
  deleteMarker() {
    this.setState({
      markerPosition: null
    })
  let arr = this.state.markers
  arr.pop()
  this.setState({markers: arr})
}

onMapClicked(props, map, e) {
  console.log('hello')
  if (this.state.showingInfoWindow)
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
    let location = {lat: 0, lng: 0};
    location.lat = e.latLng.lat();
    location.lng = e.latLng.lng();

    this.setState({
      markerPosition: location
    })
}
onMarkerClick = (props, marker, e) => {
  console.log(props)
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
}
onInfoWindowClose = () => {
  console.log('onInfoWindowClose')
  this.setState({
    activeMarker: null,
    showingInfoWindow: false
  });
}

  render() {
    const { position } = this.state;
    const containerStyle={position: 'relative'}
    return (
      <div>
        <div className="wrapper">
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />

            <input type="submit" value="Go" />
          </form>
          <button onClick={this.saveMarker}>Save marker</button>
        <button onClick={this.deleteMarker}>delete</button>
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>

        <div>
          <Map
            {...this.props}
            initialCenter={this.state.initialCenter}
            center={position}
            centerAroundCurrentLocation={false}
            containerStyle={containerStyle}
            style={style}
            google={this.props.google} 
            onClick={this.onMapClicked}
            >
            {
              this.state.markerPosition ?
              <Marker position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }} name={'Current location'} />
              : null
            }
            <Markers 
              onMarkerClick={this.onMarkerClick}
              markers={this.state.markers}
            />
            <Polyline
              fillColor="#0000FF"
              fillOpacity={0.35}
              path={this.state.markers}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              onClose={this.onInfoWindowClose}
              visible={this.state.showingInfoWindow}
            >
            <h1>hello from marker number {this.state.selectedPlace.name}</h1>
          </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
);

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw')
})(MapWrapper)
