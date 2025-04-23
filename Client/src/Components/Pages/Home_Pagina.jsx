import React from "react";
import '../../Styling/HomeStyling.css'
import {Navigate, BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';

const Home_Pagina = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/visualizatie");
    }
    return (
        <>
            <div className="Container">
            <h1 className={"Title"}>Welkom bij de KB.</h1>
            <button className={"Button"} onClick={handleNavigation}>Bekijk Manuscripten</button>
            </div>
        </>
    );
}

export default Home_Pagina;