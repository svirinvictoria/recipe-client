import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";

function Root(){
    return(
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="" element={<App/>}/>
        </Routes>
    )
}

export default Root;