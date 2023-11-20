import React from 'react';

const Navbar = () => {

    return (
        <nav className="w-screen flex flex-col items-end relative">
            <div className="w-full flex justify-between items-center bg-green-500 text-white h-20">
                <h1 className="pl-4 font-medium text-2xl">Bienvenido</h1>
            </div>
        </nav>
    );
};

export default Navbar;