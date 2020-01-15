/*
Input: 
object with image array, description, muscle group array 

*/
import ImageScroller from "react-image-scroller";
import React, { Component } from "react";

class exerciseCard extends Component {
  constructor(props) {
    super(props);
    const { name, description, muscles, imgs } = this.props.exercise;
    this.state = {
      name,
      description,
      muscles,
      imgs
    };
  }

  render() {
    return (
      //<div className="border borderLight rounded-lg shadow-sm p-3 mb-5 bg-white rounded exerciseContainer">
      <div className="ui card">
        <div className="content">
          <div>Name: {this.state.name}</div>
        </div>
        <div className="image">
          <ImageScroller
            innerClassName="imageContainer"
            innerStyle={{ width: "100px", height: "100px" }}
          >
            {this.state.imgs.map(path => {
              return <img src={path} alt="Not Found " />;
            })}
          </ImageScroller>
        </div>

        <div className="content">
          Primary muscles: {this.state.muscles[0].primary[0]}
          <div>
            Secondary muscles:{" "}
            {this.state.muscles[0].secondary.map(muscle => {
              return muscle + " ";
            })}
          </div>
          <div>Description: {this.state.description}</div>
        </div>
      </div>
    );
  }
}

export default exerciseCard;
