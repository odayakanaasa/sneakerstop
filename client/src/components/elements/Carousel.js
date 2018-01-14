import React, { Component } from 'react';
import Banner1 from '../../assets/images/banners/football1.jpg';
import Banner2 from '../../assets/images/banners/basketball1.jpg';
import Banner3 from '../../assets/images/banners/soccer1.jpg';

export default class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 1
        }
        //setTimeout(()=>this.changePic('right'),5000);
    }

    imageArray = [Banner1, Banner2, Banner3];    

    changePic = (direction) => {
        let currentIndex = this.state.imageIndex;        
        if(direction==='right') {
            if(this.state.imageIndex===this.imageArray.length) {
                this.setState({imageIndex: 0})
            } else {
                this.setState({imageIndex: currentIndex+1})
            }
        } else {
            if(this.state.imageIndex===0) {
                this.setState({imageIndex: this.imageArray.length})
            } else {
                this.setState({imageIndex: currentIndex-1})
            }
        }
    }

    render = () => (
        <div className='carousel-container'>
            <img src={this.imageArray[this.state.imageIndex]} />
        </div>
    )

    /*
    <div className='button left' onClick={()=>{this.changePic('left')}}>&#x276E;</div>
            <div className='button right' onClick={()=>{this.changePic('right')}}>&#x276F;</div>
            <div className="indicator">&#9675;&#9679;&#9675;</div>
    */
}