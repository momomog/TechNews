import React from 'react';
import {BrowserRouter} from "react-router-dom";

import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import HeaderWrapper from "./Header/HeaderWrapper";

function App() {
    return (
        <BrowserRouter>
            <HeaderWrapper/>
            <Content/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
