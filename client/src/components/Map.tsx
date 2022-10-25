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

// import * as React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useMap } from 'react-leaflet';

// import '../styles/map.css';

// const Map = () => {
//     // markers State
//     const [chargers, setChargers] = React.useState([]);

//     // Pin-Create Temp Menu States
//     const [addNew, setAddNew] = React.useState(false);
//     const [newLat, setNewLat] = React.useState(0);
//     const [newLong, setNewLong] = React.useState(0);
    
//     const fetchMarkers = () => {
//         fetch(`http://localhost:8192/api/markers`).then(res => res.json()).then(data => setChargers(data));
//     }

//     React.useEffect(() => {
//         fetchMarkers();
//     }, []);

//     const HandleSingleMapClick = () => {
//         useMap({
//             click(e) {
//                 setNewLat(e.latlng.lat);
//                 setNewLong(e.latlng.lng);
//                 setAddNew(false);
//             },
//         });
//         return null;
//     };

//     const confirmDouble = () => { 
//         setAddNew(true); 
//     }

//     return (
//         <div className="leaflet-container">
//             <MapContainer center={[37.984132, 23.727957]} zoom={13}>
//                 <TileLayer
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <React.Fragment>
//                 {chargers.map((marker, index) => 
//                     <Marker key={index} position={[marker.lat, marker.long]}>
//                         <Popup> 
//                             <div className="popup-text">
//                                 <span className="brand">
//                                     Brand 
//                                 </span><br></br>
//                                 <span className="description">
//                                     Description
//                                 </span><br></br>
//                                 <span className="description-content">
//                                     { marker.desc }
//                                 </span><br></br>
//                                 <span className="power">
//                                     power
//                                 </span><br></br>
//                                 <span className="creator">
//                                     Creator
//                                 </span>
//                                 <span className="creator-content">
//                                     Testing User - 2022&copy;<br></br>
//                                     Created: { `${new Date(marker.createdAt).getFullYear()}/${new Date(marker.createdAt).getUTCMonth() + 1}/${new Date(marker.createdAt).getUTCDate()}:${new Date(marker.createdAt).getUTCHours()}`} <br></br>
//                                     Last Edited - { marker.updatedAt } <br></br>
//                                 </span>
//                             </div>
//                             {
//                             // <div className="rem-btn">
//                             //         <button onClick={() => { setChargerId(marker._id); } } type="submit" key={"rem"} className="rem-btn">Remove Charger</button>
//                             // </div>}
//                         </Popup>
//                     </Marker>)}

//                     {addNew && 
//                     <Marker key={1024} position={[newLat, newLong]}>
//                         <Popup> 
//                             <div className="popup-text new-pin-popup">
//                                 <span className="title">
//                                     Add Title
//                                 </span>
//                                 <div className="title-in">
//                                     <textarea id="w3review" name="w3review" maxLength={48} rows={2}> 
//                                     </textarea>                                
//                                 </div> 
//                                 <span className="description">
//                                     Add Description
//                                 </span>
//                                 <div className="description-in">
//                                     <textarea id="test" name="w3review" maxLength={256} rows={10}> 
//                                     </textarea>  
//                                 </div>
//                                 <span className="power">
//                                     Add power
//                                 </span>
//                                 <div className="add-btn">
//                                     <button type="submit"  key={"add"} className="add-btn">Add Pin</button>
//                                 </div>
//                             </div>
//                         </Popup>
//                     </Marker>
//                 }
//                 </React.Fragment>
//             </MapContainer>
//         </div>
//     )
// }

// export default Map;