import React from 'react';
import { useNavigate } from 'react-router-dom';
 



const Inicio = () => {
    const navigate=useNavigate();

    const GoToPrincipal=()=>{
        navigate('/principal', {replace:true})};

  return (
    <div>
        <h1>Bienvenidos al Calculador de Devoluciones</h1>
        <button onClick={()=>{GoToPrincipal()}} >Ir a Principal</button>
    </div>
  )
}

export default Inicio