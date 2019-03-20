import React, { Component } from 'react';

class Hero extends Component {
    render() {
        return (
            <div
                className="jumbotron"
                style={
                    {
                        backgroundImage: `url("${this.props.background}")`,
                        width: '90vw',
                        height: '25vh',
                        marginLeft: '5vw',
                        marginTop: '2vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }
                }
            >
                {this.props.children}
            </div>
        )
    }
}

export default Hero;