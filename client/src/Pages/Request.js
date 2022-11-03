import React from "react";

import '../css/request.css'

import { useNavigate } from 'react-router-dom';

function Request() {
    const [requests, setRequests] = React.useState([]);

    const isLogged = window.localStorage.getItem('isLoggedIn');
    const username = window.localStorage.getItem('username');

    let navigate = useNavigate();

    const fetchRequests = () => {
        fetch(`http://localhost:4000/api/pins/request`, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then(res => res.json()).then(data => setRequests(data))
    }

    React.useEffect(() => {
        if (!isLogged) {
            navigate('/');
        }

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
    })

    React.useEffect(() => {
        fetchRequests();
    }, [requests])

    const handlePressAccept = (marker) => {
        fetch(`http://localhost:4000/api/pins/`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: marker.username,
                desc: marker.desc,
                title: marker.title,
                lat: marker.lat,
                long: marker.long
            })
        }).then(
            fetch(`http://localhost:4000/api/pins/requestremove`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    _id: marker._id,
                })
            })
        ).then(setRequests(requests))
    }

    const handlePressDeny = (id) => {
        fetch(`http://localhost:4000/api/pins/requestremove`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id: id,
            })
        }).then(fetchRequests())
    }

    return (
       <div className="requests">
        { requests.map((req, index) =>
            <div className="req">
                <span> { req.username } </span>
                <span> { req.title } </span>
                <span> { req.desc } </span>
                <span> { req.createdAt } </span>
                <span> Lat: { req.lat } Long: { req.long } </span>
                <div className="req-btns">
                    <button className="a" onClick={() => handlePressAccept(req) }>Accept</button>
                    <button className="d" onClick={() => handlePressDeny(req._id) }>Deny</button>
                </div>
            </div>
        )}
       </div>
    )
}

export default Request;