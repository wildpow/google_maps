import * as React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow, Polyline } from 'google-maps-react';
import Markers from './markers'
const style = {
  width: '100%',
  height: '800px',
  position: 'relative',
  display: 'flex',
  'marginLeft': 'auto',
  'marginRight': 'auto'
}
// class GoogleMapContainer extends React.Component {

  

class Mapa extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            position: null,
            position2: null,
            markers: [],
            initialCenter: {lat: 46.9282, lng: -121.5045},
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            centerAroundCurrentLocation: false
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.saveMarker = this.saveMarker.bind(this);
        this.deleteMarker = this.deleteMarker.bind(this)
    }


    /// auto complete
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
  
        this.setState({ position2: place.geometry.location });
      });
    }
//////
    getcurrentLocation = () => {
      this.setState({centerAroundCurrentLocation: true})
    }
    onMapClicked(props, map, e) {
      console.log('poop')
      if (this.state.showingInfoWindow)
        this.setState({
          activeMarker: null,
          showingInfoWindow: false
        });
        let location = {lat: 0, lng: 0};
        location.lat = e.latLng.lat();
        location.lng = e.latLng.lng();

        this.setState({
            position: location
        })
        console.log(this.state.position);
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

    deleteMarker() {
        this.setState({
          position: null
        })
      
      let arr = this.state.markers
      arr.pop()
      console.log(arr)
      this.setState({markers: arr})
    }

    saveMarker(){
      let newWayPoint = {
        lat: this.state.position.lat,
        lng: this.state.position.lng,
      };
      this.setState({ markers: [...this.state.markers, newWayPoint],});
    };
    onMapReady = (mapProps, map) => {
      this.map = map;
  
      window.onresize = () => {
        const currCenter = map.getCenter();
        this.props.google.maps.event.trigger(map, 'resize');
        map.setCenter(currCenter);
      };
    };
    render() {
      const { position2 } = this.state;

      if (!this.props.loaded) return <div>Loading...</div>;
      const containerStyle={position: 'relative'}
        return (
          <div>
            <div>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />

            <input  type="submit" value="Go" />
          </form>

          <div>
            <div>Lat: {position2 && position2.lat()}</div>
            <div>Lng: {position2 && position2.lng()}</div>
          </div>
        </div>
            {console.log('markers',this.state.markers)}
            <div>
            <Map 
              centerAroundCurrentLocation={false}
              // onReady={this.onMapReady}
              containerStyle={containerStyle}
              google={this.props.google} 
              zoom={14} 
              className={'map'} 
              center={position2}
              initialCenter={this.state.initialCenter} 
              onClick={this.onMapClicked}
              style={style}
                >{
                  this.state.position ?
                  <Marker position={{ lat: this.state.position.lat, lng: this.state.position.lng }} name={'Current location'} />
                  : null
                }
                <Markers 
                  onMarkerClick={this.onMarkerClick}
                  markers={this.state.markers}
                  // activeMarker={this.state.activeMarker}
                  // onInfoWindowClose={this.onInfoWindowClose}
                  // showingInfoWindow={this.state.showingInfoWindow}
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
            <button onClick={this.saveMarker}>Save marker</button>
            <button onClick={this.deleteMarker}>delete</button>
            <button onClick={this.getcurrentLocation}>get current location</button>
          </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw')
})(Mapa)