import React, { useState, useRef } from 'react'
import './AddPost.css'
import PostModal from '../../UI/PostModal'
import { ButtonB, ButtonD } from '../../UI/Button'
const AddPost = props =>{
const [error, setError] = useState('')
const [posting, setPosting] = useState('Post')
const postRef = useRef();

async function submitHandler(event){
    event.preventDefault();
    
    if(postRef.current.value.trim().length < 1){
    setError(<p style={{'color': 'red'}}>Please input text into your post!</p>)
    }else{
        setPosting('Posting...')
        const response = await fetch('https://socialize-6f1eb-default-rtdb.firebaseio.com/postdata.json', {
            method: "POST",
            body: JSON.stringify({post:postRef.current.value, date: new Date(), username: `${props.userData.name + ' ' + props.userData.lastname} `,likes: 0, comments:[''], file:props.userData.file}),
            headers:{'Content-Type':'aplication/json'}
        });
        props.onPostClose(true);
        postRef.current.value = '';
        setPosting('Post')
    }
}


    return <PostModal onClick={props.onPostClose}>
        <div className='add-post'>
        <ButtonD className='closebtn' onClick={props.onPostClose}>X</ButtonD>
        <br/><br/>
            <form onSubmit={submitHandler}>
            <textarea ref={postRef} placeholder='Write your post content here...' className='add-post-content'></textarea>
            {error}
            <ButtonB className='post-btn'>{posting}</ButtonB>
            </form>
            
           
        </div>
    </PostModal>
}

export default AddPost;