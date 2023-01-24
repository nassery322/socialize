import React,{useState , useRef, useEffect} from 'react'
import UserAvatar from '../Home/Forms/Users/UserAvatar';
import './PostItem.css'
import CommentModal from '../../UI/CommentModal';
import { ButtonB, ButtonA,ButtonD } from '../../UI/Button';
import CommentItem from './CommentItem';
import Comments from './Comments';

const PostItem = props =>{
const [postIsLiked, setPostIsLiked] = useState(false);
const [comments, setComments] = useState(false);
const [loadComments, setLoadComments] = useState([])
const [error, setError] = useState('')
  async function likeHandler(){
    
    if(props.userIsLoggedIn){
        setPostIsLiked(true)
        const response = await fetch(`${'https://socialize-6f1eb-default-rtdb.firebaseio.com'}/postdata/${props.id}.json`);
        const post = await response.json();
      
        post.likes = post.likes + 1;
      
        await fetch(`${'https://socialize-6f1eb-default-rtdb.firebaseio.com'}/postdata/${props.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(post)
        });
    }else{
        window.location = '#home'
    }
        
    }
   async function unlikeHandler(){
        setPostIsLiked(false);
        const response = await fetch(`${'https://socialize-6f1eb-default-rtdb.firebaseio.com'}/postdata/${props.id}.json`);
        const post = await response.json();
      
        post.likes = post.likes - 1;
      
        await fetch(`${'https://socialize-6f1eb-default-rtdb.firebaseio.com'}/postdata/${props.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(post)
        });
    }

    function commentHandler(event){
        event.preventDefault();
        setError('')
        setComments(e => !e)
    }

    async function commentData(){
       
        const response = await fetch(`${'https://socialize-6f1eb-default-rtdb.firebaseio.com'}/postdata/${props.id}/comments.json`)
    const data = await response.json();
        
    let loadedComments = [];
        for(const key in data){
            loadedComments.push({
            id:key,
            comment:data[key].comment,
            username:data[key].username,
            file:data[key].file
            })   
        }
        loadedComments.shift();
        setLoadComments(loadedComments.reverse())
}
useEffect( ()=>{
    setTimeout(() => {
        commentData()

    }, 1000);
} )
 

    return <React.Fragment>
        <div className='post-item'>
            <div className='user-name'>{<UserAvatar className='avatar' file={props.file}/> } {props.username}</div>
            <div className='post-content'>{props.content}</div>
            <div className='post-controls'><div className='heart'>
                {postIsLiked? <i class="fa-solid fa-heart" style={{'color':'red'}} onClick={unlikeHandler}></i> : <i class="fa-regular fa-heart" onClick={likeHandler}></i>}{props.likes}</div><div className='comment'><i class="fa-regular fa-comment" onClick={commentHandler}></i>{Object.keys(loadComments).length}</div></div>
                {comments && <Comments onCommentClose={commentHandler} comments={loadComments} isLoggedIn={props.userIsLoggedIn} onComment={commentHandler} id={props.id} userData={props.userData}/>}
        </div>
    </React.Fragment>
}

export default PostItem;