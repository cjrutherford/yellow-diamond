import React, {Component} from 'react';

import {connect} from 'react-redux';

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
        this.state = {activeIndex: 0};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex}); 
    }

    previous(){
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.items.length -1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if(this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    render(){
        const {activeIndex} = this.state;
        const slides = this.props.items.map(i => {
            return(
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={this.props.items.indexOf(i)}>

                    <img src={i.appIcon} alt={i.appIconAlt} />
                    <CarouselCaption captionHeader={i.appName} captionText={i.appDescription}/>    
                </CarouselItem>
            )
        })
        return(
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous} >

                <CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />    
            </Carousel>
        );
    }
}

const mapState = state => ({
    items: state.appList
});

export default connect(mapState, {})(AppCarousel);