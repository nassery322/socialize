import ReactDOM from 'react-dom'
import React from 'react';
import './PostModal.css'

const Backdrop = props => {
  return  <div className='backdrop' onClick={props.onClick}/>
}
const Overlay = props => {
return <div className='postmodal'><div className='modal-content'>{props.children}</div></div>
}

const PostModal = props => {

return  <React.Fragment>
     {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('overlay'))}
   {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, document.getElementById('overlay'))} 
        </React.Fragment>

}

export default PostModal;