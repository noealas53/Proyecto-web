import axios from 'axios';
import React, { useState } from 'react';

const AddComment = ({ post, afterSubmit }) => {

    const [inputVal, setInputVal] = useState('');

    function onChange(e) {
        setInputVal(e.target.value);

    }

    async function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: inputVal,
        };

        try{

            await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${post}`, body , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        }catch (e){
            console.log(e);
        }

        setInputVal('');
        afterSubmit(body);
    }

    return (
        <form className="rounded-md p-2 m-2 border-green-700" onSubmit={onSubmit} >
            <input value={inputVal} onChange={onChange} className="border w-full rounded-md" type="text" minLength="8" maxLength="32" placeholder="Comentario" />
        </form>
    )
}

export default AddComment;