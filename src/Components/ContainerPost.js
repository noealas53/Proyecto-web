import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cargando from './Cargando';
import Post from '../Pages/Post';

const ContainerPost = ({ username }) => {

    const [post, setPost ] = useState({ status: 'cargando', data: null });

    useEffect(() => {
        async function getPost() {
            
            const { data: response } = await axios.get("http://localhost:5000/api/publications/" , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setPost({ status: 'done', data: response.data })
        }

        getPost();

    }, []);

    if(post.status === 'cargando') return <Cargando />

    return (
        <div className="flex flex-wrap mt-2 justify-center items-center" >
            {
                post.data && post.data.map((it) => <Post username={username} key={it._id} struct={it} />)
            }
        </div>
    );
};

export default ContainerPost;