import React from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {

    const changep = useNavigate();

        const handleLogout = () => {
          localStorage.removeItem('token');
          changep('/login');
        };

    return (
        <nav className="w-screen flex flex-col items-end relative">
            <div className="w-full flex justify-between items-center bg-green-500 text-white h-20">
                <h1 className="pl-4 font-medium text-2xl px-2">Bienvenido</h1>
                <button className="pl-4 border-2 font-medium text-2xl  px-6 " onClick={handleLogout}>Cerrar sesion</button>
            </div>
        </nav>
    );
};

export default Navbar;