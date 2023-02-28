import React , {useState} from "react";
import Style from './style.scss';


// Text Font 
const FontText = (props) => {
  return (
    <h1
      className={props.className || props.class}
      id={props.id}
      style={{
        color: props.color,
        backgroundColor: props.background || "transparent",
        fontSize: props.size || "auto",
      }}
    >
      {props.children}
    </h1>
  );
};

// input Type Data \\
const InputText = (props) => {
  return (
    <input
      className={props.className || props.class || 'InputText'}
      id={props.id}
      type={props.type || 'text'}
      style={{fontSize:props.size , color:props.color , margin:'6px'}}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.label}
    ></input>
  );
};


const Button = (props) => {
    const style ={
        color:props.color ,
        backgroundColor:props.className||'rgba(22, 17, 37, 0.945)',
        fontSize:props.size
    }
  return <button className={props.className || props.class || 'Button'} id={props.id} style={style} onClick={props.click}>{props.children}</button>;
};

const Alert = (props) =>{
    const style={
        backgroundColor:props.background === 'danger' ?  'rgba(255,70,70,0.8)' : 'rgba(40,160,70,0.8)',
        fontSize:props.size || '15px',
        color:props.color || 'white' ,
        width:props.width || 'auto',
        margin:props.margin || 'auto',
        marginBottom:'5px',
        marginTop:'5px',
        padding:props.padding || '15px',
        position:'absolute',
        left:0,
        textAlign:'center',
        zIndex:900000
    }
    return (
        <div>
            <p className={props.className || 'Alert' } style={ style } >{props.children}</p>
        </div>
    )
}

const MessageBox = (props) =>{
  const [show , setShow] = useState(props.className || 'MessageBox')
  return(
    <div className={show}>
      <div className='Card'>
        <p className='Exit' onClick={()=>{setShow('MessageBoxHide')}}>x</p>
        <p className='Title'>{props.title || 'Default Title'}</p>
        <p className='Content'>{props.content || 'Default Content'}</p>
        <button onClick={props.click}>{props.go || 'Show'}</button>
      </div>

    </div>
  )
}


const Spinner = (props) =>{
    return <div className='Spinner'/> 
}

export { FontText, InputText, Button ,Alert , Spinner , MessageBox};
