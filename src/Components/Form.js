import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    function resetChan () {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('image').value = '';
    }

    async function onSubmit (event) {
        event.preventDefault();

        const dataForm = new FormData(event.target);

        const body = Object.fromEntries(dataForm.entries());

        if (body.title === '' || body.description === '' ) return toast('Campos vacios', { type: 'warning'});

        const response = await axios.post('http://localhost:5000/api/users/create', { ...body, active: body.active === 'on' },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
        });

        console.log(response);
        resetChan();
    }

    return(
        <form className="border mt-3 mb-3 px-7 py-3 rounded-md justify-center space-y-5 items-center" id="form" onSubmit={onSubmit}>
            <ToastContainer />
            <div className="flex flex-col space-y-2">
                <label htmlFor="title" >Titulo: </label>
                <input className=" border border-black rounded-md px-2" type="text" minLength="8" maxLength="32" name="title" id="title" placeholder="Titulo" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="description" >Descripcion: </label>
                <input className="border border-black rounded-md px-2" type="text" minLength="5" maxLength="32" name="description" id="description" placeholder="Descripcion" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="image" >Imagen: </label>
                <input className="border border-black rounded-md px-2" type="text" name="image" id="image" placeholder="Imagen" />
            </div>
            <div>
                <label htmlFor="active" >Activo: </label>
                <input className="rounded-md ml-16 form-checkbox h-7 w-7 text-green-500" type="checkbox" name="active" id="active" />
            </div>
            <button className="bg-gray-400 p-2 rounded-md text-white text-center w-full" type="submit" > Comentar </button>
        </form>
    );

};

export default Form;