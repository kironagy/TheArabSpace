import React from 'react';

class NotFound extends React.Component{
    
    render(){
        return(
            <div>
                <center><p style={{fontSize:'20px'}}>Not Found This Page: <span style={{fontSize:'1.06em' , color:'rgba(210,32,120,1)' }}>{this.props.match.url}</span></p></center>
            </div>
        )
    }
}
export default NotFound