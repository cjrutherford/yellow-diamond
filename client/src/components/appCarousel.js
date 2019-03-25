import React, {Component} from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { getGuestApps } from '../actions/app';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

class AppCarousel extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            guestList: []
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentDidMount(){
        this.props.getGuestApps();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.guestList){
            this.setState({
                guestList: nextProps.guestList
            });
        }
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.guestList.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex}); 
    }

    previous(){
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.guestList.length -1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if(this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    render(){
        // console.dir(this.props);
        const {activeIndex} = this.state;
        let slides = [];
        if(this.state.guestList){
            slides = this.state.guestList.map(i => {
                return(
                    <CarouselItem
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                        key={this.state.guestList.indexOf(i)}
                        cssModule={{
                            backgroundImage:`url("${i.appBanner}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            width: '90vw',
                            height: '20vw'
                        }}
                        >
                        <div
                        style={{
                            backgroundImage:`url('${i.appBanner}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            padding: '1em',
                            height: '100%',
                            width: '100%',
                        }}
                        >
                        <img src={i.appIcon} alt={i.appIconAlt} style={{width: '10wv', height: '10vh'}} />
                        </div>
                        <CarouselCaption captionHeader={i.appName} captionText={i.appDescription}
                        style={{
                            background: 'rgba(33,33,33,0.9)',
                            boxShadow: '2px 2px 2px 2px rgba(33,33,33,0.8)',
                            color: 'black'
                        }}/>    
                    </CarouselItem>
                )
            });
            return(
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                    className='jumbotron'
                    style={{
                        width: '90vw',
                        marginLeft:'5wv',
                        marginTop: '2vh',
                        color: 'black',
                    }}
                    >
    
                    <CarouselIndicators items={this.state.guestList} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />    
                </Carousel>
            );
        }else {
            return(
                <div className='jumbotron' style={{
                    width: '90vw',
                    marginLeft: '5vw',
                    marginTop: '2vh'
                }}>
                    <h1>No Apps</h1>
                </div>
            );
        }
        

    }
}

AppCarousel.propTypes = {
    
}

const mapState = state => ({
    guestList: state.apps.guestList
});

export default connect(mapState, {getGuestApps})(AppCarousel);