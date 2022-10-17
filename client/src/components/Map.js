import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function Map() {
    return (
  
      <MapContainer center={[37.984132, 23.727957]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
            position={[37.984132, 23.727957]}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
        </Marker>
      </MapContainer>
  
    );
  }
  
  export default Map;