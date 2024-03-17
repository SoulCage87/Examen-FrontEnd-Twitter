import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.MY_APP_URL;

export const AgregarComentario = () => {
    const { idPost } = useParams();
    const navigate = useNavigate();

    const [comentario, setComentario] = useState('');
    const [usuario, setUsuario] = useState('')

    const onChangeComment = (event) => {
        const { name, value } = event.target
        setComentario(value)
        console.log(value)
    }

    const onChangeUser = (event) => {
        const { name, value } = event.target;
        setUsuario(value)
        console.log(value)
    }

    const AgregarComentario = async (event) => {
        event.preventDefault();
        const data = {
            nombre_usuario: usuario,
            comentario: comentario
        }

        console.log(data)

        try {
            const url = baseUrl + `/comentario/${idPost}`
            const result = await axios.post(url, data)
            const resultData = (await result).data;
            navigate('/muro')
        } catch (e) {
           console.log(e) 
        }
     
    }

    return (
        <>
            <form onSubmit={AgregarComentario}>
                <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '640px', maxHeight: '500px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Agrega tu Comentario!</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name='usuario' onChange={onChangeUser} placeholder='Nombre del usuario' />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name='comentario' onChange={onChangeComment} placeholder='Comentario bonito...' />
                        </div>
                        <button className='btn btn-outline-primary' type='submit'>Comentar <img src="/src/assets/comentario.svg" alt="" style={{ width: '20px' }} /> </button>
                    </div>
                </div>
            </form>
        </>
    )
}

