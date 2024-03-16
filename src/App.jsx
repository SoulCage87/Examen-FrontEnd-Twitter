import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IniciarSesion } from './components/IniciarSesion.jsx';
import { Muro } from './components/Muro.jsx';
import {Registrarse} from './components/Registrarse.jsx'
import './App.css'
import { CrearPost } from './components/CrearPost.jsx';


function App() {

  return (
    <>
      <nav className="navbar" style={{backgroundColor: '#e3f2fd'}}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/src/assets/X-Social.svg" alt="Fake X" width="30" height="29" className="d-inline-block align-text-top" />
          </a>
        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IniciarSesion />} />
          <Route path='/muro' element={<Muro />} />
          <Route path='/Registrate' element={<Registrarse />}/>
          <Route path='/CrearPost' element={<CrearPost/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
