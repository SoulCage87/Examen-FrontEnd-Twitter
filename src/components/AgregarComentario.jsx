import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.MY_APP_URL;

export const AgregarComentario = () => {
    const {idPost} = useParams();
    const navigate = useNavigate();

    const [comentario,setComentario] = useState({
        comentario: ''
    })

    const onChange = (event) => {
        const {name, value} = event.target
        
        setComentario({...comentario, [name]:value})
        }

        const AgregarComentario = async (event) => {
            event.preventDefault();
            const url = baseUrl + `/comentario/${idPost}`
            const result = await axios.post(url,comentario)
            const resultData = (await result).data;
            navigate('/muro')  
            }

  return (
    <>
    <form onSubmit={AgregarComentario}>
    <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '640px', maxHeight: '500px' }}>
        <div className="card-body">
            <h5 className="card-title text-center">Agrega tu Comentario!</h5>
            <div className="input-group mb-3">
                <input type="text" className="form-control" name='comentario' onChange={onChange} placeholder='Comentario bonito...'/>
            </div>
            <button className='btn btn-outline-primary' type='submit'>Subir <img src="/src/assets/comentario.svg" alt="" style={{ width: '20px' }} /> </button>
        </div>
    </div>
</form>
</>
  )
}

