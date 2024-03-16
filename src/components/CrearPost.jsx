import { useState } from 'react'
const baseUrl = import.meta.env.MY_APP_URL;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CrearPost = () => {
    const navigate =  useNavigate();

    const [formPost, setFormPost] = useState({

        nombre_usuario : "", 
        imagen : "", 
        caption : ""
        
    });

    const onChangeHandler = () => {

        const { name, value } = event.target;
        if (name ==="imagen") {

           const img = event.target.files[0];
           setFormPost({ ...formPost, [name]: img });
           return;
           
        }
        setFormPost({ ...formPost, [name]: value });

    }

    const onSubmit = async (event) => {

        const url = baseUrl + `/publicacion`

        event.preventDefault();

        const datosFormulario = new FormData();
        
        datosFormulario.append( "nombre_usuario" , formPost.nombre_usuario);
        datosFormulario.append( "caption" , formPost.caption);
        datosFormulario.append( "imagen" , formPost.imagen);

        const result  = await axios.post(url, datosFormulario);
        const resultData = (await result).data;

        navigate('/Muro')
    }



    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '640px', maxHeight: '500px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">¡Dile al mundo que piensas!</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name='nombre_usuario' placeholder='Nombre del Usuario...' onChange={onChangeHandler}/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name='caption' placeholder='Caption...' onChange={onChangeHandler}/>
                        </div>
                        <h5 className='text-start'>Elige tu imagen...</h5>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" name='imagen' onChange={onChangeHandler}/>
                        </div>
                        <button className='btn btn-outline-success' type='submit'>Subir <img src="/src/assets/subir.png" alt="" style={{ width: '20px' }} /> </button>
                    </div>
                </div>
            </form>
        </>
    )
}
