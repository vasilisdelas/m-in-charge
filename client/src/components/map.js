import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';

import '../css/map.css';

function Map() {
    const username = window.localStorage.getItem('username');
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    // Pins State
    const [pins, setPins] = React.useState([]);
    const [draftPins, setDraftPins] =  React.useState([]);
    const [apiPins, setApiPins] = React.useState([]);

    // Pin-Create Temp Menu States
    const [addNew, setAddNew] = React.useState(false);
    const [newLat, setNewLat] = React.useState(-1028);
    const [newLong, setNewLong] = React.useState(-1028);

    // Pin-Create States
    const [createTitle, setCreateTitle] = React.useState("title");
    const [createDescription, setCreateDescription] = React.useState("Power");
    const [createUser, setCreateUser] = React.useState();
    const [createLat, setCreateLat] = React.useState(0);
    const [createLong, setCreateLong] = React.useState(0);

    const [role, setRole] = React.useState("default")

    const getRole = () => {
        fetch(`http://localhost:4000/api/users/getrole`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
            })
            }).then((res) => res.json()).then(data => setRole(data) );
    }

    // Βρες τα pins απο το db
    const fetchPins = () => {
        fetch(`http://localhost:4000/api/pins`).then(res => res.json()).then(data => setPins(data));
    }

    const fetchDraftPins = () => {
        fetch(`http://localhost:4000/api/pins/request`).then(res => res.json()).then(data => setDraftPins(data));
    }

    // Τρέξε 1 φορά στην αρχή (όταν φορτώνει αρχικά το site)
    React.useEffect(() => {
        fetchPins();
        fetchDraftPins();
        getRole();
        fetch(`https://api.openchargemap.io/v3/poi/?key=5781e46b-3746-4991-9f26-73c155ddb4f7&countrycode=GR`, {
            method: "GET"
        }).then(res => res.json()).then(data => setApiPins(data))
    }, []); // [] ώστε να τρέξει μία φορά μόνο.


    // Πιάνει το πρώτο click και προετοιμάζει για την confirmDouble(). Μπαίνει στο map.
    const HandleSingleMapClick = () => {
        useMapEvents({
            click(e) {
                setNewLat(e.latlng.lat);
                setNewLong(e.latlng.lng);
                setAddNew(false);
            },
        });
        return null;
    };

    // Πιάνει το doubleClick και ανοίγει το menu. Μπαίνει στο div και όχι στο map.
    const confirmDouble = () => { 
        setAddNew(true); 
        setCreateLat(newLat);
        setCreateLong(newLong);
        setCreateUser(username);
    }

    // Χειρίζεται το add-btn-press
    const handleAddMarker = () => {
        if (createTitle.length < 3 || createTitle.length > 32) return;
        if (createDescription.length < 3 || createDescription.length > 256) return;
        postAddMarker();
    }
    
    // Στέλνει νεο pin στην mongodb
    const postAddMarker = () => {
        fetch(`http://localhost:4000/api/pins`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: createUser,
                title: createTitle,
                desc: createDescription,
                lat: createLat,
                long: createLong
            })
        }).then(() => {
            setCreateTitle("");
            setCreateDescription("");
            setAddNew(false);
            setCreateLat(0);
            setCreateLong(0);
            fetchPins();
        })
    }

    // Χειρίζεται και διαγράφει ένα pin στο rem-btn press 
    const handleRemButton = (id) => {
        fetch(`http://localhost:4000/api/pins/remove`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                _id: id,
            })
        }).then(fetchPins())
    }

    const handleRequestButton = (marker) => {
        fetch(`http://localhost:4000/api/pins/request/remove`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                _id: marker._id,
                username: marker.username,
                title: marker.title,
                desc: marker.desc,
                lat: marker.lat,
                long: marker.long,
                createdAt: marker.createdAt,
                updatedAt: marker.updatedAt
            })
        }).then(() => { setAddNew(false); }).catch(() =>  { setAddNew(false); } )
    }

    const handleRequestAddMarker = () => {
        if (createTitle.length < 3 || createTitle.length > 32) return;
        if (createDescription.length < 3 || createDescription.length > 256) return;
        fetch(`http://localhost:4000/api/pins/request`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: createUser,
                title: createTitle,
                desc: createDescription,
                lat: createLat,
                long: createLong
            })
        }).then(() => {
            setCreateTitle("");
            setCreateDescription("");
            setCreateLat(0);
            setCreateLong(0);
            setAddNew(false);
            fetchPins();
        })
    }
    const iconMarkup = renderToStaticMarkup(<i className="fa fa-map-marker-alt fa-3x" />);
    const dbIconMarkup = renderToStaticMarkup(<i className="fa fa-bolt fa-3x" />);
    const apiMarkerIcon = divIcon({
        className: 'api-marker',
        html: iconMarkup,
    });

    const dbMarkerIcon = divIcon({
        className: 'db-marker',
        html: dbIconMarkup,
    });

    const draftMarkerIcon = divIcon({
        className: 'draft-marker',
        html: iconMarkup,
    });

    return (
        <div className="leaflet-container" onDoubleClick={confirmDouble}>
                <MapContainer center={[37.9836997, 23.7282821]} zoom={13} > <HandleSingleMapClick />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <React.Fragment>
                        {apiPins.map((marker, index) => 
                            <Marker key={index} icon={apiMarkerIcon} position={[marker.AddressInfo.Latitude, marker.AddressInfo.Longitude]}>
                            <Popup> 
                                <div className="popup-text">
                                    <span className="title">
                                        Brand 
                                    </span><br></br>
                                    <span className="title-content">
                                        { marker.AddressInfo.Title }
                                    </span><br></br>
                                    <span className="description">
                                        Power
                                    </span><br></br>
                                    <span className="description-content">
                                        { marker.Connections.map((connection, index) =>
                                            `(${index+1}): ${connection.PowerKW} KW ${index !== marker.Connections.length - 1 ? " || " : ""}`
                                        )}
                                    </span><br></br>
                                    <span className="creator">
                                        Creator
                                    </span>
                                    <span className="creator-content">
                                        Fetched from Open Charge Map - {new Date().getFullYear()} &copy;<br></br>
                                        Created: { `${new Date(marker.DateCreated).getFullYear()}/${(new Date(marker.DateCreated).getMonth() + 1).toString().padStart(2, '0')}/${new Date(marker.DateCreated).getDate().toString().padStart(2, '0')} at ${new Date(marker.DateCreated).getHours().toString().padStart(2, '0')}:${new Date(marker.DateCreated).getMinutes().toString().padStart(2, '0')}:${new Date(marker.DateCreated).getSeconds().toString().padStart(2, '0')}`} <br></br>
                                        Last Edited: { `${new Date(marker.DateLastStatusUpdate).getFullYear()}/${(new Date(marker.DateLastStatusUpdate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(marker.DateLastStatusUpdate).getDate().toString().padStart(2, '0')} at ${new Date(marker.DateLastStatusUpdate).getHours().toString().padStart(2, '0')}:${new Date(marker.DateLastStatusUpdate).getMinutes().toString().padStart(2, '0')}:${new Date(marker.DateLastStatusUpdate).getSeconds().toString().padStart(2, '0')}`} <br></br>
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                        )}
                        {pins.map((marker, index) => 
                            <Marker key={index} icon={dbMarkerIcon} position={[marker.lat, marker.long]}>
                                <Popup> 
                                    <div className="popup-text">
                                        <span className="title">
                                            Brand 
                                        </span><br></br>
                                        <span className="title-content">
                                            { marker.title }
                                        </span><br></br>
                                        <span className="description">
                                            Power
                                        </span><br></br>
                                        <span className="description-content">
                                            { marker.desc }
                                        </span><br></br>
                                        <span className="creator">
                                            Creator
                                        </span>
                                        <span className="creator-content">
                                            { marker.username } - {new Date(marker.updatedAt).getFullYear()} &copy;<br></br>
                                            Created: { `${new Date(marker.createdAt).getFullYear()}/${(new Date(marker.createdAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(marker.createdAt).getDate().toString().padStart(2, '0')} at ${new Date(marker.createdAt).getHours().toString().padStart(2, '0')}:${new Date(marker.createdAt).getMinutes().toString().padStart(2, '0')}:${new Date(marker.createdAt).getSeconds().toString().padStart(2, '0')}`} <br></br>
                                            Last Edited: { `${new Date(marker.updatedAt).getFullYear()}/${(new Date(marker.updatedAt).getMonth() + 1).toString().padStart(2, '0')}/${new Date(marker.updatedAt).getDate().toString().padStart(2, '0')} at ${new Date(marker.updatedAt).getHours().toString().padStart(2, '0')}:${new Date(marker.updatedAt).getMinutes().toString().padStart(2, '0')}:${new Date(marker.updatedAt).getSeconds().toString().padStart(2, '0')}`} <br></br>
                                        </span>
                                    </div>
                                { (isLoggedIn && role !== "default") &&
                                    <div className="rem-btn">
                                        <button onClick={() => { handleRemButton(marker._id) } } type="submit" key={"rem"} className="rem-btn">Remove</button>
                                    </div>
                                }
                                { (isLoggedIn && role === "default") &&
                                    <div className="request-rem-btn">
                                        <button onClick={() => { handleRequestButton(marker) } } type="submit" key={"req-rem"} className="request-rem-btn">Request Removal</button>
                                    </div>
                                }
                                </Popup>
                            </Marker>
                        )}
                    </React.Fragment>

                    {(addNew && isLoggedIn) && 
                        <Marker key={1024} icon={draftMarkerIcon} position={[newLat, newLong]}>
                            <Popup> 
                                <div className="popup-text new-pin-popup">
                                    <span className="title">
                                        Brand
                                    </span>
                                    <div className="title-in">
                                        <textarea onChange={(e) => setCreateTitle(e.target.value)} id="w3review" name="w3review" maxLength={48} rows={2}> 
                                        </textarea>                                
                                    </div> 
                                    <span className="description">
                                        Power
                                    </span>
                                    <div className="description-in">
                                        <textarea onChange={(e) => setCreateDescription(e.target.value)} id="test" name="w3review" maxLength={256} rows={8}> 
                                        </textarea>  
                                    </div>
                                    { role === "Admin" ?
                                    <div className="add-btn">
                                        <button type="submit" onClick={() => { handleAddMarker() } } key={"add"} className="add-btn">Add Pin</button>
                                    </div> 
                                    :
                                    <div className="request-add-btn">
                                        <button type="submit" onClick={() => { handleRequestAddMarker() } } key={"req-add"} className="request-add-btn">Request Addition</button>
                                    </div>
                                    }
                                </div>
                            </Popup>
                        </Marker>
                    }
                </MapContainer>
        </div>
    )
}

export default Map;