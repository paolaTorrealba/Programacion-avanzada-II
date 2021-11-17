import React from 'react'
import 'bulma/css/bulma.css'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Detalle from './pages/Detalle';
import Error404 from './pages/Error404';

function App() {
  return (
// ruteo de componenetes a crear
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mascota/:id" element={<Detalle />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
