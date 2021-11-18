import React from 'react'
import 'bulma/css/bulma.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Detalle from './pages/Detalle';
import Tipos from './pages/Tipos';
import Error404 from './pages/Error404';

function App() {
  return (
    // ruteo de componenetes a crear
    <Router>
      <Switch>
        <Route exact path="/mascota/:id" component={Detalle} />
        <Route exact path="/" component={Home} />
        <Route exact path="/tipos/:tipo" component={Tipos}/>
        <Route exact path="*" component={Error404}/>
      </Switch>
    </Router>
  );
}

export default App;
