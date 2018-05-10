import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {

  componentDidUpdate() {
    this.loadMap(); 
  }

  loadMap() {
    if (this.props && this.props.google) { 
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: {lat: 47.9051125, lng:  -122.2419099},
        zoom: 20, 
        mapTypeId: 'roadmap' 
      })

      this.map = new maps.Map(node, mapConfig); 

    }
  }

  render() {
    const style = { 
      width: '90vw', 
      height: '75vh'
    }

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}