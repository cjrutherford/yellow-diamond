import React, { Component, Fragment } from 'react';

import Hero from './hero';
import AppCarousel from './appCarousel';

import HeroImage from '../assets/hero.gif';


import YellowDiamond from '../assets/Yellow Diamond.gif';

class Landing extends Component {
    render() {
        return (
            <Fragment>
                <Hero background={HeroImage}>
                    <img src={YellowDiamond} style={{ width: '8vw' }} />
                    <h1
                        style={{
                            background: 'rgba(0,0,0,0.5)',
                            boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.5)',
                            color: 'white',
                        }}
                    >Yellow Diamond</h1>
                    <h4
                        style={{
                            background: 'rgba(0,0,0,0.5)',
                            boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.5)',
                            color: 'white',
                        }}
                    >From Garnet Labs</h4>
                </Hero>
                <AppCarousel>
                </AppCarousel>
            </Fragment>
        );
    }
}

export default Landing;