import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "./assets/styles/custom.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

import { Provider } from 'react-redux';
import store from "./store/index";
import { history } from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        {/* add routes with layouts */}
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/auth" component={Auth} />
        {/* add routes without layouts */}
        <Route exact path="/landing" exact component={Landing} />
        <Route exact path="/profile" exact component={Profile} />
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
