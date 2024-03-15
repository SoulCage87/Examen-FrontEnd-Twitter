import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = import.meta.env.MY_APP_URL;

export const IniciarSesion = () => {

    const navigate = useNavigate();

    const [dataform, setdataform] = useState({
        nombre_usuario: '',
        contrasena: ''
    });

    const [inicioSesion, setInicioSesion] = useState('');

    const onChangeHandler = (event) => {

        const { name, value } = event.target;
        setdataform({ ...dataform, [name]: value });

    }

    const OnSubmitHandler = async (event) => {
        event.preventDefault();

        const url = baseUrl + `/usuario/auth/${dataform.nombre_usuario}/${dataform.contrasena}`;

        try {
            const result = await axios.get(url);
            const resultData = (await result).data
            navigate('/muro')
        } catch (e) {
            setInicioSesion('Error de Inicio de Sesion')
            console.log(inicioSesion)
        }
    }

    const register = () => {
        navigate('/Registrate')
    }

    return (
        <>
            <form onSubmit={OnSubmitHandler}>
                <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded position-absolute top-50 start-50 translate-middle" style={{ maxWidth: '640px', maxHeight: '500px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/src/assets/X image.jpg" className="img-fluid rounded-start" style={{ height: '300px', width: '450px' }} alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title text-center mx-3">Iniciar Sesion</h5>
                                <div className="input-group mb-3 m-2">
                                    <span className="input-group-text" id="basic-addon1">Usuario</span>
                                    <input type="text" name='nombre_usuario' className="form-control" placeholder="..." onChange={onChangeHandler} />
                                </div>
                                <div className="input-group mb-3 m-2">
                                    <span className="input-group-text" id="basic-addon1">Contraseña</span>
                                    <input type="password" name='contrasena' className="form-control" placeholder="..." onChange={onChangeHandler} />
                                </div>
                                <div className="text-center">
                                <button type="submit" className="btn btn-primary mb-3">Iniciar Sesion</button>
                                </div>                            
                                <div className="text-center mt-2">
                                    <p className="card-text"><small className="text-body-secondary">No tienes una cuenta?</small></p>
                                    <button type="button" onClick={register} className="btn btn-primary">Registrarse</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}


