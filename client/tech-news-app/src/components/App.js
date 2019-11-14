import React from 'react';
import {BrowserRouter} from "react-router-dom";

import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Content/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
