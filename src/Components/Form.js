import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    function resetChan () {
        document.getElementById('url').value = '';
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
        document.getElementById('state').value = '';
    }

    async function onSubmit (event) {
        event.preventDefault();

        const dataForm = new FormData(event.target);

        const body = Object.fromEntries(dataForm.entries());

        if (body.url === '' || body.name === '' || body.price === '' || body.description === '' || body.category === '' || body.state === '' ) return toast('Campos vacios', { type: 'warning'});

        const response = await axios.post('/api/publications/create', { ...body, active: body.active === 'on' },{
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
                <label htmlFor="url" >URL: </label>
                <input className=" border border-black rounded-md px-2" type="text" minLength="8" maxLength="32" name="url" id="url" placeholder="url" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" >Nombre: </label>
                <input className="border border-black rounded-md px-2" type="text" minLength="5" maxLength="32" name="name" id="name" placeholder="name" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="price" >Precio: </label>
                <input className=" border border-black rounded-md px-2" type="text" minLength="8" maxLength="32" name="price" id="price" placeholder="price" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="description" >Descripcion: </label>
                <input className=" border border-black rounded-md px-2" type="text" minLength="8" maxLength="32" name="description" id="description" placeholder="description" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="category" >Categoria: </label>
                <input className="border border-black rounded-md px-2" type="text" name="category" id="category" placeholder="category" />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="state" >Estado: </label>
                <input className=" border border-black rounded-md px-2" type="text" minLength="8" maxLength="32" name="state" id="state" placeholder="state" />
            </div>
            <button className="bg-gray-400 p-2 rounded-md text-white text-center w-full" type="submit" > Comentar </button>
        </form>
    );

};

export default Form;