import React from 'react';
import {BrowserRouter} from "react-router-dom";


import Footer from "./Footer/Footer";
import HeaderWrapper from "./Header/HeaderWrapper";
import SwitchRouter from "./RouterPages/SwitchRouter";

function App() {
    return (
        <BrowserRouter>
            <HeaderWrapper/>
            <SwitchRouter/>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
