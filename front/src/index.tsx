import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./view/components/Header/Header";
import { Router } from "react-navi";
import routes from "./view/routes";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.Fragment>
    <Navigation />
    <Router routes={routes}></Router>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
