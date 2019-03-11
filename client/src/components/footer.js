import React, {Component} from 'react';

class Footer extends Component{

    constructor(props){
        super(props);
        this.state = {
            footerStyles : {
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '5vh',
                background: 'rgba(20,20,20,0.8)'
            }
        }
    }

    render(){
        return(
            <div style={this.state.footerStyles}>Hello Footer</div>
        );
    }
}

export default Footer;