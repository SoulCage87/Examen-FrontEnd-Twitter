import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const baseUrl = import.meta.env.MY_APP_URL;
import axios from 'axios';

export const Muro = () => {

const navigate = useNavigate();

const [datosMuro, setDatosMuro] = useState([]);
const [borrar, setBorrar] = useState(0);

const getDatos = async () => {

   const url = baseUrl + `/publicacion`;
   const result = await axios.get(url)
   const datos = (await result).data;
   setDatosMuro(datos);
}

const publicarPost = () => {
      navigate('/CrearPost')
}

const deletePost = async (idPost) => {

  const url = baseUrl+`/publicacion/${idPost}`
  const result = await axios.delete(url)
  const data = (await result).data 

  setBorrar(borrar + 1)
}

useEffect(() => {
  getDatos()
},[borrar])



  return (
    <>
     <div className="container mt-3">
     <button className="btn btn-outline-secondary w-100" type="button" onClick={publicarPost} >
                ¿En que piensas hoy?
        </button>
        {
            datosMuro.map((post) => (
              <div key={post.id} className="card mt-3 shadow p-2 mx-auto mb-5 bg-body-tertiary justify-content-center" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">{post.nombre_usuario} <button onClick={ ()=> deletePost(post.id)} className="btn btn-outline-danger"><img src="/src/assets/eliminar.png" alt="" style={{height: '25px'}} /></button><button className='btn btn-outline-warning mx-2'><img src="/src/assets/editar.png" alt="" style={{height: '25px'}} /></button></h5>
                <div className="mx-auto">
                <img src={`data:${post.mime_type};base64,${post.imagen}`} style={{height:'150px'}} alt="" className='rounded mx-auto d-block' />
                </div>
                <p className="card-text mt-2">{post.caption}</p>
              </div>
            </div> 
            ))
        }
     </div>
    </>
  )
}
