import React from 'react'
import './NameAndLogo.css'
import logo from '../../../assets/logo.png'
const NameAndLogo = props =>{
return <React.Fragment>
    <div className='name-logo'>
        <img src={logo} />
    </div>
</React.Fragment>
}

export default NameAndLogo