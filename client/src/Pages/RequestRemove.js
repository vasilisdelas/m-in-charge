import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import '../css/request.css'

export default function RequestRemove() {
    const isLogged = window.localStorage.getItem('isLoggedIn');
    const username = window.localStorage.getItem('username');

    const [pinsToRemove, setPinsToRemove] = React.useState([]);

    const fetchRequests = () => {
        fetch(`http://localhost:4000/api/pins/request/remove`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(res => res.json()).then(data => setPinsToRemove(data))
    }

    React.useEffect(() => {
        fetchRequests();
    }, [pinsToRemove])

    React.useEffect(() => {
        fetch(`http://localhost:4000/api/users/getrole`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: username,
            })
        }).then(res => res.json()).then(role => {
            if (role !== "Admin") navigate('/')
        })
        fetchRequests();
    }, [])

    const handlePressAccept = (marker) => {
        fetch(`http://localhost:4000/api/pins/request/removerequest`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id: marker._id,
            })
        }).then(
        fetch(`http://localhost:4000/api/pins/request/removepin`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: marker._id,
                })
        }).then(setPinsToRemove(pinsToRemove)))
    }

    const handlePressDeny = (id) => {
        fetch(`http://localhost:4000/api/pins/request/removerequest`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id: id,
            })
        }).then(setPinsToRemove(pinsToRemove))
    }

    let navigate = useNavigate();
    if (pinsToRemove.length > 0) {
        return (
            <div className="remove-container">
            {
                pinsToRemove.map((marker, index) =>
                <>
                    <div className="req">
                        <span> { marker.username } </span>
                        <span> { marker.title } </span>
                        <span> { marker.desc } </span>
                        <span> { marker.createdAt } </span>
                        <span> Lat: { marker.lat } Long: { marker.long } </span>
                        <div className="req-btns">
                            <button className="a" onClick={() => { handlePressAccept(marker) } }>Accept</button>
                            <button className="d" onClick={() => { handlePressDeny(marker._id) } }>Deny</button>
                        </div>
                    </div> 
                </>
                )
            }
            </div>
        )
    }
}