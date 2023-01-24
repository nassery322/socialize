import React,{useState} from 'react'
import './Home.css'
import HomeBackground from './HomeBackground'
import NavBar from './Navbar/NavBar'
import HomeContent from './HomeContent'
import SignUpForm from './Forms/SignUpForm'
import LoginForm from './Forms/LoginForm'
const Home = props =>{
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [userFirstLetter, setUserFirstLetter] = useState();
    const [userPhoto, setUserPhoto] = useState(null)
    const [userData, setUserData] = useState({})

   function signupHandler(event){
    setSignup(item => !item);

   }
   function userAddHandler(data){
    setUserLoggedIn(true);

   }

   function loginHandler(event){
    setLogin(item => !item)
   }
   props.userIsLoggedIn(userLoggedIn)
   props.userData(userData)
    return <HomeBackground>
        <div className='home' id='home'>
        <NavBar userIsLoggedIn={userLoggedIn} />
        <HomeContent onSignup={signupHandler} onLogin={loginHandler} isLoggedIn={userLoggedIn} data={userData} />
        {signup && <SignUpForm onSignupClose={signupHandler} onUserAdd={userAddHandler} />}
        {login && <LoginForm onLoginClose={loginHandler} onLogin={userAddHandler} />}
        </div>
    </HomeBackground>
}

export default Home;