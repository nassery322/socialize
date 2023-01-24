import React,{useState} from 'react'
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import About from './components/About/About';
import Contact from './components/Contact/Contact'
function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({})
 function loginHandler(event){
setUserIsLoggedIn(event)
 }
 function userDataHandler(prop){
  setUserData(prop)
 }
  return (
    <div className="App">
      <Home  userIsLoggedIn={loginHandler} userData={userDataHandler}/>
      <Explore onUserIsLoggedIn={userIsLoggedIn} userData={userData} />
      <About />
      <Contact />
    </div>
  );
}

export default App;
