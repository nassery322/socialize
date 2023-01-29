import React, {useState, useEffect} from 'react'
import { ButtonC } from '../../UI/Button';
import CommentModal from '../../UI/CommentModal';
import AddPost from './AddPost';
import './Explore.css'
import Posts from './Posts';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
const Explore = props =>{    
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [addPost, setAddPost] = useState(false);
const [userCredintials, setUserCredintials] = useState({})
    async function fetchData(e){
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata/${e}.json`)
        const data = await response.json();
      
    const loadedData = [];
     for(const key in data){
         loadedData.push({
             name:data[key].name,
             lastname:data[key].lastname,
             file:data[key].file
         })
         setUserCredintials(loadedData[0])
    }
    }
      useEffect( ()=>{
        onAuthStateChanged( auth, async (currentUser) => {
            if(currentUser.uid){
                fetchData(currentUser.uid)
                setIsLoggedIn(true)
            }
        }, [isLoggedIn]  )
    } )
    function postAddHandler(){
        setAddPost(true)
    }
    function postCloseHandler(){
        setAddPost(false)
    }

    return <React.Fragment>
        <div className='explore' id='explore'>
            <div className='explore-posts'>
                <br/>
            {isLoggedIn ? <ButtonC className={'aaa'} onClick={postAddHandler}>+</ButtonC> : <ButtonC className='aaa'>Login or signup to add posts</ButtonC>}
            {addPost && <AddPost userData={userCredintials} onPostAdd={postAddHandler} onPostClose={postCloseHandler}/>}
            <Posts userData={userCredintials} userIsLoggedIn={isLoggedIn}/>
            </div>
        </div>
    </React.Fragment>
}

export default Explore;