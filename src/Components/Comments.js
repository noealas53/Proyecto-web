import React from 'react';

const Comments = ({ info }) => {

    const { description, user } = info;

    return (
        <div className="border rounded-md p-2 m-2 border-green-700" >
            <h1 className="text-xs" >{user?.username}</h1>
            <p>{ description }</p>
        </div>
    )
}

export default Comments;