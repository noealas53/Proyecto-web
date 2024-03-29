import React from 'react';

const Post = ({ username, struct }) => {
    const { url, name, description, user } = struct;

    return (
        <div className="bg-green-200 rounded-xl w-72 p-5 m-3">
            <div className="w-full flex font-bold border border-gray-700 rounded-md p-3">
                <h1 className="w-1/2">{user?.username}</h1>
            </div>
            {url && <img className="w-64 h-40 object-cover my-3 rounded-md" src={url} alt="imagen" />}
            <div className="w-full flex flex-col p-3 space-y-2">
                <h1 className="text-xs font-bold">{name}</h1>
                <h2 className="text-center text-sm">{description}</h2>
            </div>
        </div>
    );
};

export default Post;