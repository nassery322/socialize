import React from 'react'
import './HomeBackground.css'


const HomeBackground = (props) =>{
    return <React.Fragment>
        <div className='home-background'>
            {props.children}
        </div>
    </React.Fragment>
}

export default HomeBackground;