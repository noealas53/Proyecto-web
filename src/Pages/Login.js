import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const changep = useNavigate();
    const user = useRef(null);
    const pass = useRef(null);

    async function onSubmit(event) {
        
        event.preventDefault();

        const userVal = user.current.value;
        const passVal = pass.current.value;

        if ( !userVal || !passVal ) {
            toast('Campos vacios', { type: 'warning'});
            return;
        }

        try {

            const res = await axios.post('http://localhost/api/auth/login', { email: userVal, password: passVal } );
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
                changep('/');
            }

        } catch (e) {

            const { response } = e;

            let msj = '';

            if (response && response.status === 500) {
            msj = 'Error de servidor';
            console.error(response.data); // Imprime detalles del error del servidor en la consola
            } else if (response && response.status === 404) {
            msj = 'Usuario no existe';
            } else {
            msj = 'Error desconocido';
            console.error(e); // Imprime detalles del error desconocido en la consola
            }

            toast (msj, { type: 'error' });
        }
    }

    return (
        <form className="flex flex-col items-center justify-center w-screen h-screen" onSubmit={onSubmit} >
            <ToastContainer />
            <div className="space-y-7 text-center border border-gray-500 p-7 text-xl" >
                <div className="flex flex-col space-y-3" >
                <label htmlFor="user-label">
                    <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" /> 
                    Usuario
                </label>
                    <input className="rounded-md p-2 border" type="text" id="user-input" placeholder="usuario" ref={user} />
                </div>
                <div className="flex flex-col space-y-3" >
                    <label htmlFor="pass-label">
                        <FontAwesomeIcon icon={faUnlockAlt} size="lg" className="mr-2" /> 
                        Contraseña
                    </label>
                    <input className="rounded-md p-2 border" type="password" id="pass-input" placeholder="Contraseña" ref={pass} />
                </div>
                <button className="bg-green-500 text-white p-3 rounded-lg" type="submit">Iniciar sesion</button>
            </div>
        </form>
    )
};

export default Login;