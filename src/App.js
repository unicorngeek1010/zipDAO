import './App.css';
import 'antd/dist/antd.min.css';
import React from "react";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Explore from './components/Explore';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Explore />
        </Route>
      </Switch>
    </Router>
   
  );
}

export default App;
