import React, {useState, useEffect} from 'react'
import './UserAvatar.css'
import { auth } from '../../../Firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth'
const UserAvatar = props =>{

    const [userInfo, setUserInfo] = useState(null);
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
         setUserInfo(loadedData[0])
    }
 
    }

      useEffect( ()=>{
        setTimeout(() => {
            onAuthStateChanged( auth, async (currentUser)=>{ if(currentUser.uid){
                await  fetchData(currentUser.uid)}
         })
        }, 1000);
      
    }, [userInfo] )

    const content = userInfo || props.file && <img src={props.file? props.file : userInfo.file} />
    return <React.Fragment>
        <div onClick={props.onClick} className={'user-avatar ' + props.className}>
            {content}
        </div>
    </React.Fragment>
}

export default UserAvatar