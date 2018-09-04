import React from 'react';
import Syncr from './components/main';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const App = ({match}) => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Syncr}/>
      </Switch>
    </div>
  </Router>
)

export default App;
