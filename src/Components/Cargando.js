import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Cargando = () => (
    <div className=" h-screen w-screen justify-center items-center absolute top-0 left-0 z-20 flex h-screen w-screen bg-gray-700 bg-opacity-30" >
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" />
    </div>
);

export default Cargando;