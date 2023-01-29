import React, { useState, useEffect } from 'react'
import UserAvatar from '../Forms/Users/UserAvatar';
import NameAndLogo from '../Logo/NameAndLogo';
import './NavBar.css'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../Firebase/firebase';
import NavModal from '../../../UI/NavModal';
const NavBar = props =>{
const [navBtn, setnavBtn] = useState(false)
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userCredintials, setUserCredintials] = useState({})
const [modalIsVisible, setModalIsVisible] = useState(false)
function navButtonHandler(){
setnavBtn(event => !event)
}


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
async function logoutHandler(){
await signOut(auth);
window.location.reload();
}

    return <React.Fragment>
        <div className='navbar'>
        <nav>
  <a href="#" class="logo">
    <NameAndLogo />
  </a>
  {!navBtn? <React.Fragment><ul class="nav-links">
  {isLoggedIn && <li className='avatar-link'><a href='#'><UserAvatar/>
  </a></li>}
    
    <li><a href="#home">Home</a></li>
    <li><a href="#explore">Explore</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
    {isLoggedIn && <li><a href="#" onClick={logoutHandler}>Log out</a></li>}
  </ul>
  <div class="nav-button">
    <i class="fas fa-bars" onClick={navButtonHandler}></i>
  </div>
  </React.Fragment>
    :<NavModal onClick={navButtonHandler}>
    <ul className='nav-list'>

    {isLoggedIn && <li className='user-cred'>
      <section><UserAvatar /></section>
    <section>{userCredintials.name + ' ' + userCredintials.lastname}</section>
    </li>}
    <li  ><a  onClick={navButtonHandler} href="#home">Home</a></li>
    <li  ><a  onClick={navButtonHandler} href="#explore">Explore</a></li>
    <li  ><a  onClick={navButtonHandler} href="#about">About</a></li>
    <li  ><a  onClick={navButtonHandler} href="#contact">Contact</a></li>
    {isLoggedIn && <li><a href="#" onClick={logoutHandler}>Log out</a></li>}
    </ul>
    </NavModal>}

</nav>

        </div>
    </React.Fragment>
}


export default NavBar;