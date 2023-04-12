import React,{useEffect, useState} from 'react';
import productos from "../Productos/productos"



const Principal = () => {


    const [cantidades,setCantidades] =useState([""]);

    const [itemCantidad,setItemCantidad]=useState({
        nombre:"",
        cantidad:"",
        precio:""
    });
    const [cupoDevolucion,setCupoDevolucion]=useState(0);

    const[tePasaste,setTePasaste]=useState(false);

    const nuevaCantidad=(e,precio)=>{
        const {name,cantidad}=e.target;
        
        let itemNuevo={
            nombre:"",
            cantidad:"",
            precio:""
        };

        itemNuevo.nombre=e.target.name;
        itemNuevo.cantidad=e.target.value;
        itemNuevo.precio=e.target.alt;

        // console.log("item nuevo" + itemNuevo.nombre + "  " + itemNuevo.cantidad) 
        setItemCantidad([itemNuevo])
    };
  

     useEffect(() => {
         
        // console.log("cantidades") 
        // console.log(cantidades)
        // console.log(cantidades.length)
        // console.log("itemCantidad ")
        // console.log(itemCantidad)
        if(itemCantidad.nombre!="") {
            // console.log("tiene nombre")
            let aCambiar=[]
            let coincidencia={
                nombre:"",
                cantidad:"",
                precio:"",
            };
            let bandera =false
            
            if (cantidades==""){
                // console.log(cantidades)
                setCantidades(itemCantidad);
                // console.log("primer ingreso")
                
            }
            else{
             
                for(let i=0 ; i <cantidades.length; i++){
                    // console.log("else")
                    // console.log(cantidades)
                    if(cantidades[i].nombre==itemCantidad[0].nombre){
                        // console.log(cantidades[i].nombre+ " es igual a "+itemCantidad[0].nombre)
                        // console.log("ya hay un item con ese nombre, cambio la cantidad");
                                                
                        coincidencia.nombre=itemCantidad[0].nombre;
                        coincidencia.cantidad=itemCantidad[0].cantidad;
                        coincidencia.precio=itemCantidad[0].precio;

                        // console.log("coincidencia   :"+ coincidencia.nombre +" "+ coincidencia.cantidad)
                        aCambiar=[...cantidades]
                        aCambiar.splice(i,1);
                        aCambiar.push(coincidencia)
                        setCantidades(aCambiar)
                        bandera=true
                        break
                    } 
                
                }  
                if(bandera==false){
                    // console.log("introduce item nuevo")
                    let nuevasCantidades=[...cantidades]
                    // console.log(nuevasCantidades)
                    nuevasCantidades.push(itemCantidad[0])
                    setCantidades(nuevasCantidades)
                }
            }
            
                
            
        }  
    }     
     
     
       
     , [itemCantidad])
   
    const subtotal=(itemNombre,itemPrecio)=>{

        for (let i =0 ;i< cantidades.length;i++){
            if(cantidades[i].nombre===itemNombre){
                let sub=cantidades[i].cantidad*itemPrecio
                return sub.toFixed(2)
                
            }
        }


    }
    


    const total=()=>{
        let suma=0
        for(let i =0 ;i<cantidades.length;i++){
            suma+=cantidades[i].cantidad*cantidades[i].precio
        }


        useEffect(() => {
            if(suma>cupoDevolucion){
                    setTePasaste(true)
                    
                }
                else{
                    setTePasaste(false)
                }

        
            }, [total])

        if (isNaN(suma)){
            return 0
        }
        
        
        return suma.toFixed(2)
    }
    const cupo=(e)=>{
        const cupoDeDevo= e.target.value
        setCupoDevolucion(cupoDeDevo);
    }

   
    

  

  return (<> 
  <nav style={{position:"fixed",top:"0",backgroundColor:"rgb(182, 196, 222)",width:"100%",margin:"0",padding:"0",display:"flex", justifyContent:"space-evenly"}}>
            <img src="/download.jpg" alt="Osito" width="70vw" />
                <p style={{fontSize:"large",fontFamily:"monospace",fontWeight:"bolder" }}>Suma total de Productos: $ {total()} </p><p style={{paddingRight:"2rem", fontFamily:"monospace",fontWeight:"bolder"}}>Cupo de Devolucion (Opcional) $<input type='number'  style={{width:"12vh"}} onChange={cupo} ></input>{tePasaste==true ? (<><p style={{fontSize:"x-large",color:"red",fontWeight:"bolder"}}>Te Pasaste </p></>):(<></>)}</p>
            
            </nav>
     <div style={{justifyContent:"center",textAlign:"center",padding:"6rem 0.5rem 0 0.5rem" }}>
        <div style={{backgroundColor:"rgba(93, 214, 255, 0.1)"}}>
        <div>{tePasaste==true ? (<><p style={{fontSize:"x-large",color:"red",fontWeight:"bolder"}}>Te Pasaste </p></>):(<></>)}</div>
           
            <h2>Listado de Productos</h2>
                         
                <table style={{border:"solid 3px gray",margin:"auto",width:"100%",borderRadius:"10px"}}>
                <tbody>
            
        {productos?.map((item,index)=>{
             
            return (< >
                    <tr  id={index} >
                        <td  style={{width:"2%"}}><input style={{width:"4vw"}} type='number'   name={item.name}  min={0} alt={item.precio} onChange={nuevaCantidad}></input></td>
                        <td  > <p style={{fontSize:"0.75rem"}} >{item.name}</p> </td>
                        <td><p style={{fontSize:"0.75rem"}} >${item.precio}</p></td>
                        <td><p  style={{fontSize:"0.75rem"}}>SubTotal:$ {isNaN(subtotal(item.name,item.precio)) ? (<>0</>):(<>{subtotal(item.name,item.precio)}</>) }</p></td>
                    </tr>
                    
            
            </>)

        })}
                 </tbody>
            </table>
            
        </div>

           

     </div>
     </>)
}

export default Principal