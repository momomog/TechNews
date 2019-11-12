import React from 'react';
import {BrowserRouter} from "react-router-dom";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

function App(props) {
  return (
      <BrowserRouter>
          <Header/>
          <Content posts={props.store.postsList}/>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
