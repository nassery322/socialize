import React, { useState, useRef, useEffect } from "react";
import { storage, auth} from "../../Firebase/firebase";
import Modal from "../../../UI/SignupModal";
import {ButtonD, ButtonC} from "../../../UI/Button";
import './SignUpForm.css'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { atob } from 'atob'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { async } from "@firebase/util";
import fetchData from "./FetchData";
import Crop from "./Crop";


const SignUpForm = (props) => {


  const [isloading, setIsLoading] = useState(false);
  const [imageisUploading, setImageisUploading] = useState(false);
  const [cropImage, setCropImage] = useState(null)


useEffect( ()=>{
    onAuthStateChanged( auth, async (currentUser) => {
            fetchData(currentUser.uid)
    }  )
} )


  const image = useRef();
  const [imageURL, setImageURL] = useState(null);
  const imageRef = ref(storage, `images/${Math.random().toString()}`)

  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
    file: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",

  });

  async function submitHandler(event) {
    event.preventDefault();

    let hasErrors = false;
    if (formValues.name.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
    }
    if (formValues.lastname.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastname: "Last name is required",
      }));
    }
    if (formValues.email.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    }
    if (formValues.password.trim() === '') {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else if (formValues.password.trim().length < 8) {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is shorter than 8 character"
      }))
    }
    if (formValues.passwordconfirm.trim() === "") {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordconfirm: "Password confirmation is required",
      }));
    } else if (formValues.passwordconfirm !== formValues.password) {
      hasErrors = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordconfirm: "Passwords do not match",
      }));
    }
  
    let userId;
    if (!hasErrors) {
      setIsLoading(true)
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password,
        );
        const imageFile = imageURL? imageURL : 'https://firebasestorage.googleapis.com/v0/b/connected-c86f2.appspot.com/o/images%2Fblank-profile-picture.jpg?alt=media&token=4e11a9f8-f563-4e6d-ba92-3869bebd6868';
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/userdata/${user.user.uid}.json`, {
          method: 'POST',
          body: JSON.stringify({ name: formValues.name, lastname: formValues.lastname, file: imageFile}),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        props.onSignupClose(true)
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false)
    }
    
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setErrors('')
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
  function imageChangeHandler() {
    setCropImage(image.current.files[0]);
  }
  async function uploadImageHandler(picture){
    setImageisUploading(true)
    const imageElement = document.createElement('img');
    imageElement.src = picture;
  
    await new Promise(resolve => imageElement.addEventListener('load', resolve));
  
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    canvas.getContext('2d').drawImage(imageElement, 0, 0);
  
    const file = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

     uploadBytes(imageRef, file).then((snapshot) => getDownloadURL(snapshot.ref).then(url => {
      setImageURL(url)
    }).then(() => console.log('uploaded succesfully')))

    setImageisUploading(false)
    setCropImage(false)
  }
  return (
    <Modal onClick={props.onSignupClose}>
      <ButtonD className='close-btn' onClick={props.onSignupClose}>X</ButtonD>
<form className="signup-form" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={changeHandler}
          value={formValues.name}
          placeholder=" Enter your Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={changeHandler}
          value={formValues.lastname}
          placeholder=' Enter your Last Name'
        />
        {errors.lastname && <p className="error">{errors.lastname}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          placeholder="example@mail.com"
          type="email"
          id="email"
          name="email"
          onChange={changeHandler}
          value={formValues.email}

        />
              <span class="highlight"></span>
      <span class="bar"></span>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="file">Profile Photo:</label>
        <input
          type="file"
          id="file"
          name="file"
          ref={image}
          onChange={imageChangeHandler}
          
          style={{ 'background': 'white' }}
        />
        {cropImage && <Crop image={cropImage} onImageCropped={uploadImageHandler} />}
        </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={changeHandler}
          value={formValues.password}
          placeholder=" Enter your Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="passwordconfirm">Confirm your password:</label>
        <input
          type="password"
          id="passwordconf"
          name="passwordconfirm"
          onChange={changeHandler}
          value={formValues.passwordconfirm}
          placeholder=" Confirm your Password"
        />
        {errors.passwordconfirm && <p className="error" >{errors.passwordconfirm}</p>}
      </div>

      <ButtonC type="submit" disabled={imageisUploading}>
       {isloading? 'Signing up' : 'Sign up'}
      </ButtonC >
    </form>
</Modal>)}

export default SignUpForm;
     


