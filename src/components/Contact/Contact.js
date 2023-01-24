import React from 'react'
import './Contact.css'


const Contact = props =>{
return <div className='contact' id='contact'>
    <div className='contact-info'>
        <div className='email'><a href="mailto:ahmadullahnassery322@gmail.com"><i class="fa-regular fa-envelope"></i> Send us an email</a></div>
        <div className='number'><i class="fa-solid fa-phone"></i> +93 744 15 8196</div>
    </div>
    <div className='copyright'>&copy; Copyright 2022</div>
    <div> </div>
</div>
}

export default Contact;