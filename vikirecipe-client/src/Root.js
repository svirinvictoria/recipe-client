import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import App from "./App";
import { useProxy } from "./hooks/useProxy";

function Root(){
    const proxy = useProxy();
    const navigate = useNavigate();

    return(
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="" element={<App/>}/>
        </Routes>
    )
}

export default Root;