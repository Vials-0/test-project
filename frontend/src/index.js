import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import PlacePage from './PlacePage/PlacePage';
import { Header } from './app-components';


ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/place/:id'>
        <Header />
        <PlacePage />
      </Route>
      <Route path='/'>
        <App />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
