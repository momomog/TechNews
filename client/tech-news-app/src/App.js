import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="container">
          <div className="row">
              <div className="span12">
                  <div className="head">
                      <div className="row-fluid">
                          <div className="span12">
                              <div className="span6">
                                  <h1 className="muted">Tech-news</h1>
                              </div>

                              <div className="span4 offset2" style={{marginTop:"15px"}}>
                                  <button className="btn pull-right" type="button">Sign In</button>
                              </div>
                          </div>
                      </div>

                      <div className="navbar">
                          <div className="navbar-inner">
                              <div className="container">
                                  <ul className="nav">
                                      <li>
                                          <a href="#">Explore Product</a>
                                      </li>

                                      <li>
                                          <a href="#">Search</a>
                                      </li>

                                      <li>
                                          <a href="#">Features</a>
                                      </li>

                                      <li>
                                          <a href="#">Blog</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
