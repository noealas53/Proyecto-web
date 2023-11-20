import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostConteiner from '../Components/ContainerPost'
import Form from '../Components/Form';

const Main = () => {
    
    const changep = useNavigate();

    const [whoami, setWhoami] = useState();

    const user = localStorage.getItem('token');

    useEffect(() => {

        async function getIden() {
            const { data } = await axios.get('http://localhost:5000/api/publications/', {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });

            setWhoami(data.username);
        }
        
        if (user == null) {
            changep('/login');
            return;
        }

        getIden();
        // eslint-disable-next-line
    }, []);

    return (
        
        <div className="w-full">
            {
            <div className="mt-5 flex flex-wrap justify-center items-center">
                <Form />
            </div>
            }
            <PostConteiner username={whoami} />
        </div>

    );
};

export default Main;