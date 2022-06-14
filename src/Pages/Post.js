import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart , faComments } from '@fortawesome/free-solid-svg-icons';
import Comments from '../Components/Comments'
import axios from 'axios';
import AddComment from '../Components/AddComment';
import shortid from 'shortid';

const Post = ({ username, struct }) => {

    const { _id, title, description, image, user, createdAt, likes, comments } = struct;

    const [showComment, setShowComment] = useState(false)
    const [commentState, setCommentState] = useState(comments);
    const [like, setLike] = useState(likes.some((it) => it.username === username ));
    const [likeCount, setLikeCount ] = useState(likes.length);

    function addComment (comment) {
        const val = [ ...commentState, { ...comment, user: { username }}];
        setCommentState(val)
    }

    async function likePost() {
        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if(!like ) {
            setLikeCount ( likeCount + 1 );
            setLike(true);
        } else {
            setLikeCount ( likeCount - 1 );
            setLike(false);
        }

    }


    return(
        <div className ="bg-green-200 rounded-xl w-72 p-5 m-3" >
            <div className="w-full flex font-bold border border-gray-700 rounded-md p-3" >
                <h1 className="w-1/2" >{ user?.username }</h1>
                <h2 className="w-1/2 text-right" >{ new Date(createdAt).toLocaleDateString() }</h2>
            </div>
            {
                image && <img className="w-64 h-40 object-cover my-3 rounded-md" src= { image } alt="imagen"></img>
            }
            <div className="w-full flex flex-col p-3 space-y-2" >
                <h1 className="text-xs font-bold" > {title} </h1>
                <h2 className="text-center text-sm" > { description } </h2>
            </div>
            <div className="w-full flex justify-around" >
                <button onClick={likePost} type="button" className={`flex justify-center items-center ${like && 'text-green-500'}`}>
                    <FontAwesomeIcon icon={faHeart} className="mr-2" /> { likeCount }
                </button>
                <button onClick={() => setShowComment(!showComment)} type="button" className={`flex justify-center items-center ${showComment && 'text-green-500'}`}>
                    <FontAwesomeIcon icon={faComments} className="mr-2" /> { commentState.length }
                </button>
            </div>
            <div className={`${!showComment && 'hidden'}`} >
                {
                    comments && commentState.map((it) => <Comments key={shortid.generate()} info={it} />)
                }
                <AddComment post={_id} afterSubmit={addComment} />
            </div>
        </div>
    )
    
};

export default Post;