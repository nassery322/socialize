import React, {Fragment, useState, useEffect, useRef} from 'react'
import './PostItem.css'
import CommentModal from '../../UI/CommentModal';
import {ButtonA, ButtonD } from '../../UI/Button';
import CommentItem from './CommentItem';
const Comments = props =>{
    const [loadComments, setLoadComments] = useState([])
    const [error, setError] = useState('')
    const commentRef = useRef();

    async function addCommentHandler(event){
        event.preventDefault();
        const username = props.userData.name + ' ' + props.userData.lastname;
        if(props.isLoggedIn){
            if(commentRef.current.value.trim().length > 0 ){
                const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/postdata/${props.id}/comments.json`,{
                    method: 'POST',
                    body: JSON.stringify({comment: commentRef.current.value, username: username, file:props.userData.file})
                })
                const data = await response.json();
                commentRef.current.value = ''
            }else{
                setError(<p style={{'color': 'red'}}>Please input your comment in the field!</p>)
            }
        }else{
            setError(<p style={{'color': 'red'}}>Please Login to add comments!</p>)
        }
           
        }

    async function commentData(){
await setLoadComments(props.comments)
    }
    useEffect( ()=>{
        commentData()
    }, [props.comments] )

    return  <CommentModal onClick={props.onComment}>
    <div className='comments'>
        <ButtonD className='close-btn' onClick={props.onComment}>X</ButtonD><br/><br/>
        <form>
            <textarea ref={commentRef} />
            {error}
            <ButtonA className='commentbtn' onClick={addCommentHandler}>Post</ButtonA>
        </form>
        <div className='prev-comments'>
            <p >Comments:</p>
            {loadComments.map( comment => <CommentItem file={comment.file} username={comment.username} comment={comment.comment} />)}
        </div>
    </div>
</CommentModal>
}


export default Comments