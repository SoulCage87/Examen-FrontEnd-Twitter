import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.MY_APP_URL;

export const Registrarse = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pass, setPass] = useState('');
  const [conPass, setConPass] = useState('');

  const usuarioHandler = (event) => {
    const {name,value} = event.target;
    setUser(value);
  }

  const correoHandler = (event) => {
    const {name,value} = event.target;
    setCorreo(value)
  }

  const nombreHandler = (event) => {
    const {name,value} = event.target;
    setNombre(value);
  }

  const apellidoHandler = (event) => {
    const {name,value} = event.target;
    setApellido(value)
  }

  const passHandler = (event) => {
    const {name,value} = event.target;
    setPass(value)
  }

  const conPassHandler = (event) => {
    const {name,value} = event.target;
    setConPass(value)
  }

const OnSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
        nombre_usuario: user,
        correo_electronico: correo,
        contrasena: pass,
        nombre: nombre,
        apellido: apellido,
        confirmacion_con: conPass
    }

    const url = baseUrl + `/usuario`;

    const result = await axios.post(url,data)
    const resultData = (await result).data;
    navigate('/')

        console.log(result);
        console.log(resultData);
  
}
    return (
        <>
        <form onSubmit={OnSubmitHandler}>
            <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded position-absolute top-50 start-50 translate-middle" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">¡Registrate!</h5>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Nombre de Usuario</span>
                        <input type="text" className="form-control" name="user" onChange={usuarioHandler} />
                    </div>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Correo Electronico </span>
                        <input type="text" className="form-control" name="correo" onChange={correoHandler} />
                    </div>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Nombre </span>
                        <input type="text" className="form-control" name="nombre" onChange={nombreHandler} />
                    </div>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Apellido </span>
                        <input type="text" className="form-control" name="apellido" onChange={apellidoHandler} />
                    </div>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Contraseña </span>
                        <input type="password" className="form-control" name="pass" onChange={passHandler} />
                    </div>
                    <div className="input-group mb-3 mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Confirmar Contraseña </span>
                        <input type="password" className="form-control" name="conPass" onChange={conPassHandler} />
                    </div>
                    <div className="text-center mb-3">
                    <button type="submit" className="btn btn-success">Registrate</button>
                    </div>
                </div>
            </div>
            </form>
        </>
    )
}

export default Registrarse
