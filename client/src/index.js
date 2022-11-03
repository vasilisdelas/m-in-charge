import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import App from './App';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';
import Request from './Pages/Request.js';
import RequestRemove from './Pages/RequestRemove.js';
import NotFound from './Pages/NotFound.js';
import About from './Pages/About.js';
import News from './Pages/News.js';

import Header from './components/Header/header.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
                <div className="app">
                    <Header/>
                    <App/>
                </div>
            }/>
            <Route path="/login" element={
                <div className="app">
                    <Login/>
                </div>
            }/>
            <Route path="/register" element={
                <div className="app">
                    <Register/> 
                </div>
            }/>
            <Route path="/about" element={
                <div className="app">
                    <Header/>
                    <About/>
                </div>
            }/>
            <Route path="/news" element={
                <div className="app">
                    <Header/>
                    <News/>
                </div>
            }/>
            <Route path="/requests" element={<Request/>}/>
            <Route path="/requests/remove" element={<RequestRemove/>}/>
            <Route path="*" element={<NotFound/>}/> 
        </Routes>
    </BrowserRouter>
);