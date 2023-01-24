import React, {useEffect, useState} from 'react'
import PostItem from './PostItem';
import './Posts.css'
import Pagination from './Pagination';

const Posts =  props => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
   async function postsData(){
    const response = await fetch('https://socialize-6f1eb-default-rtdb.firebaseio.com/postdata.json');
const data = await response.json();
let loadedPosts=[];
    for(const key in data){
        loadedPosts.push({
        id:key,
        username:data[key].username,
        post:data[key].post,
        likes:data[key].likes,
        comments: data[key].comments,
        date:data[key].date,
        file:data[key].file
    })
}
setPosts(loadedPosts.reverse())
}
useEffect( ()=>{
    postsData()  
})
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
    return <React.Fragment>
        <div className='posts'>
     {currentPosts.map( (post) => <PostItem key={post.id} file={post.file} comments={post.comments} userIsLoggedIn={props.userIsLoggedIn} userData={props.userData} id={post.id} likes={post.likes} username={post.username} content={post.post} /> )}
     {<Pagination
                totalPosts={posts.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />}
        </div>
    </React.Fragment>
}

export default Posts