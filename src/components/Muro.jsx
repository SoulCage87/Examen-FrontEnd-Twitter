import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const baseUrl = import.meta.env.MY_APP_URL;
import axios from 'axios';

export const Muro = () => {

  const navigate = useNavigate();

  const [datosMuro, setDatosMuro] = useState([]);
  const [borrar, setBorrar] = useState(0);
  const [comments, setComments] = useState([])


  const getDatos = async () => {

    const url = baseUrl + `/publicacion`;
    const result = await axios.get(url)
    const datos = (await result).data;
    setDatosMuro(datos);
  }

  const getComentario = async (idPost) => {
    const url = baseUrl + `/comentario/${idPost}`
    const result = await axios.get(url);
    const datos = (await result).data;
    setComments(datos)
  }

  const publicarPost = () => {
    navigate('/CrearPost')
  }

  const deletePost = async (idPost) => {

    const url = baseUrl + `/publicacion/${idPost}`
    const result = await axios.delete(url)
    const data = (await result).data

    setBorrar(borrar + 1)
  }

  const deleteComment = async (idComment) => {
   const url = baseUrl + `/comentario/${idComment}`
   const result = await axios.delete(url)
   const data = (await result).data
   setBorrar(borrar + 1)
  }


  const updatePost = (idPost) => {

    navigate(`/editPost/${idPost}`)
  }

  const postComentario = (idPost) => {
    navigate(`/aggComentario/${idPost}`)
  }

  useEffect(() => {
    getDatos()
  }, [borrar])



  return (
    <>
      <div className="container mt-3">
        <button className="btn btn-outline-secondary w-100" type="button" onClick={publicarPost} >
          ¿En que piensas hoy?
        </button>
        {
          datosMuro.map((post) => (
            <div key={post.id} className="card mt-3 shadow p-2 mx-auto mb-5 bg-body-tertiary justify-content-center" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{post.nombre_usuario} <button onClick={() => deletePost(post.id)} className="btn btn-outline-danger"><img src="/src/assets/eliminar.png" alt="" style={{ height: '25px' }} /></button><button className='btn btn-outline-warning mx-2' onClick={() => updatePost(post.id)}><img src="/src/assets/editar.png" alt="" style={{ height: '25px' }} /></button></h5>
                <div className="mx-auto">
                  <img src={`data:${post.mime_type};base64,${post.imagen}`} style={{ height: '150px' }} alt="" className='rounded mx-auto d-block' />
                </div>
                <p className="card-text mt-2">{post.caption}
                </p>
                <button type="button" className="btn btn-primary mx-auto" onClick={() => getComentario(post.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Ver Comentarios
                </button>
                <button type="button" className="btn btn-primary mx-auto mt-2" onClick={() => postComentario(post.id)}>
                  Agregar Comentario
                </button>
              </div>
            </div>
          ))
        }
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Comentarios</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                comments.map((comentario) => (

                  <div key={comentario.id} className="container">
                    <div className="text-nowrap bg-body-secondary border" style={{ width: '8rem' }}>
                      <p>Comentario: {comentario.comentario} <button className='btn btn-danger' onClick={() => deleteComment(comentario.id)} style={{height: '2rem'}}><img src="/src/assets/eliminar.png" alt="" style={{height: '1.5rem'}}/></button></p>
                    </div>
                  </div>

                ))
              }
            </div>
            <div className="modal-footer">
              <button type="button" id='close' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
