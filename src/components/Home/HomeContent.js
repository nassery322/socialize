import React, {useState, useEffect} from 'react'
import { ButtonA, ButtonB } from '../../UI/Button';
import './HomeContent.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
const HomeContent = props =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [signup, setsignup] = useState(false)
    const [login, setLogin] = useState(false)
    const [userCredintials, setUserCredintials] = useState({})
    async function fetchData(e){
        const response = await fetch(`https://socialize-6f1eb-default-rtdb.firebaseio.com/userdata/${e}.json`)
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

function signupHandler(){
        setsignup(true)
        props.onSignup(true)
} 
function loginHandler(){
    setLogin(true)
    props.onLogin(true)
}

    return <React.Fragment>
        <div className='home-content'>
            <div className='home-header'>Socialize <i class="fa-solid fa-comments"></i></div>
            <div className='home-quote'>"Connect, collaborate, and create with like-minded individuals on Socialize."</div>
    {isLoggedIn ? <><div className='home-quote2 welcome'>Welcome {userCredintials.name} {userCredintials.lastname} !</div></> : <><div className='home-quote2'>Experience the benefits of socializing and networking on Socialize. Create your account now.</div>
    <div className='home-credintials'>
    <ButtonB onClick={signupHandler}>SignUp</ButtonB> <ButtonA onClick={loginHandler}>Login</ButtonA> 
    </div></>}
        </div>
    </React.Fragment>
}

export default HomeContent;