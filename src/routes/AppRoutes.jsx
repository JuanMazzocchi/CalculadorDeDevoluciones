import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import App from '../App';
import Principal from '../principal/Principal';
import Inicio from '../paginaInicio/inicio';

const AppRoutes = () => {
  return ( 
<BrowserRouter>
    <Routes>
        <Route path='*' element={<Inicio />}/>
        <Route path='/principal' element={<Principal />} />



    </Routes>



</BrowserRouter>



  )
}

export default AppRoutes