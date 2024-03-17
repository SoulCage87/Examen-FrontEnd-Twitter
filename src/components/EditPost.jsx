import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.MY_APP_URL;

export const EditPost = () => {
    const { idPost } = useParams();
    const navigate = useNavigate()

    const [edit, setEdit] = useState({
        caption: ''
    })



    const onChange = (event) => {
        const { name, value } = event.target

        setEdit({ ...edit, [name]: value })
    }

    const editPost = async (event) => {
        event.preventDefault();
        const url = baseUrl + `/publicacion/${idPost}`
        const result = await axios.put(url, edit)
        const resultData = (await result).data;
        navigate('/muro')

    }

    return (
        <>
            <form onSubmit={editPost}>
                <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '640px', maxHeight: '500px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Edita tu Publi</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name='caption' placeholder='Caption...' onChange={onChange} />
                        </div>
                        <button className='btn btn-outline-warning' type='submit'>Editar <img src="/src/assets/editar.png" alt="" style={{ width: '20px' }} /> </button>
                    </div>
                </div>
            </form>
        </>
    )
}


