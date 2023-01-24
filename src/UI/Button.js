import './Button.css'


export const ButtonA = props =>{
    return <button onClick={props.onClick} className={'button-a btn ' + props.className}>
        {props.children}
    </button>
}

export const ButtonB = props =>{
    return <button onClick={props.onClick} className={'button-b btn ' + props.className}>
        {props.children}
    </button>
}

export const ButtonC = props =>{
    return <button onClick={props.onClick} type="submit" className={'button-c ' + props.className} >
        {props.children}
    </button>
}

export const ButtonD = props =>{
    return <button onClick={props.onClick} className={'button-d ' + props.className}>
        {props.children}
    </button>
}

