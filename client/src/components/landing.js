import React, { Component, Fragment } from 'react';

import Hero from './hero';
import AppCarousel from './appCarousel';

import YellowDiamond from '../assets/Yellow Diamond.gif';

class Landing extends Component {
    render() {
        return (
            <Fragment>
                <Hero background="https://placehold.it/1024x600" >
                    <img src={YellowDiamond} style={{ width: '20vw' }} />
                    <h1
                        style={{
                            background: 'rgba(33,33,33,0.5)',
                            boxShadow: '2px 2px 2px 2px rgba(33,33,33,0.5)'
                        }}
                    >Yellow Diamond</h1>
                    <h4
                        style={{
                            background: 'rgba(33,33,33,0.5)',
                            boxShadow: '2px 2px 2px 2px rgba(33,33,33,0.5)'
                        }}
                    >From Garnet Labs</h4>
                </Hero>
                <appCarousel>
                </appCarousel>
            </Fragment>
        );
    }
}

export default Landing;