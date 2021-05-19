import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AOS from "aos";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

AOS.init({
  offset: 100,
  duration: 250, 
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
