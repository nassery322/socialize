import React from 'react'
import './CommentItem.css'
import UserAvatar from '../Home/Forms/Users/UserAvatar'
const CommentItem = props =>{

    return <React.Fragment>
        <div className='comment-item'>
        <div className='name-avatar'><UserAvatar className='avatar' file={props.file} />{props.username}</div>
        <div className='user-comment'>{props.comment}</div>
        </div>
    </React.Fragment>
}

export default CommentItem;