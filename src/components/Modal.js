import React, { Component } from "react";
import axios from "axios";
import "./Modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpRes: null,
      current: ""
    };
  }
  componentDidMount() {
    let address = this.props.home.address + " " + this.props.home.city + " " + this.props.home.state + " " + this.props.home.zipcode;
    this.getFood(address, "");
  }
  //   getFood = location => {
  //     axios
  //       .get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}`, {
  //         headers: {
  //           Authorization:
  //             "Bearer kI2kwj0Xe-eSbRpBDk9XGP5YWVejR0KvPN3aisNyX36Fr6NzMAto9Au1EpFHCy0PKzDFSxjnSopUOf6lKYQTz1NsAWAwLh6SMLTwMzhlP3XJzcVxsScXKc4ChDqVXHYx"
  //         }
  //       })
  //       .then(res => {
  //         this.setState(
  //           {
  //             yelpRes: res.data.businesses
  //           },
  //           () => console.log(this.state.yelpRes)
  //         );
  //       });
  //   };
  getFood = (location, category) => {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${category}&location=${location}`, {
        headers: {
          Authorization:
            "Bearer kI2kwj0Xe-eSbRpBDk9XGP5YWVejR0KvPN3aisNyX36Fr6NzMAto9Au1EpFHCy0PKzDFSxjnSopUOf6lKYQTz1NsAWAwLh6SMLTwMzhlP3XJzcVxsScXKc4ChDqVXHYx"
        }
      })
      .then(res => {
        this.setState(
          {
            yelpRes: res.data.businesses,
            current: location
          },
          () => console.log(this.state.yelpRes, this.state.current)
        );
      });
  };
  render() {
    const filtered = this.state.yelpRes !== null && this.state.yelpRes.filter(res => res.rating >= 4.5);

    const filteredList = filtered ? (
      filtered
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
        .map(place => {
          return (
            <div className="place" key={place.id}>
              <h1 className="place-name">{place.name}</h1>
              <p className="cats">{place.categories.map(cat => cat.title).join(", ")}</p>
              <p>
                <i className="fas fa-car-side" /> {(place.distance / 1609.344).toFixed(2)} miles
              </p>
              <p>
                <i className="far fa-star" />
                {place.rating}/5
              </p>
            </div>
          );
        })
    ) : (
      <img src="https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif" alt="loading" className="loading" />
    );

    return (
      <div className="modal-container">
        <div className="modal-content">
          <div className="col-1">
            <img src={this.props.home.image} alt="house" className="modal-image" />
            <p className="address">{this.props.home.address},</p>
            <p className="address">
              {this.props.home.city}, {this.props.home.state} {this.props.home.zipcode}
            </p>
            <p className="price">{this.props.home.price}</p>
          </div>
          <div className="col-2">
            <span onClick={() => this.props.toggle("")} className="close">
              &#x2715;
            </span>
            <h1>Top Restaurants Nearby:</h1>
            <div className="btns">
              <button onClick={() => this.getFood(this.state.current, "bars")} className="cat-btns">
                Bars
              </button>
              <button onClick={() => this.getFood(this.state.current, "breakfast")} className="cat-btns">
                Breakfast
              </button>
              <button onClick={() => this.getFood(this.state.current, "mexican")} className="cat-btns">
                Mexican
              </button>
              <button onClick={() => this.getFood(this.state.current, "italian")} className="cat-btns">
                Italian
              </button>
              <button onClick={() => this.getFood(this.state.current, "thai")} className="cat-btns">
                Thai
              </button>
              <button onClick={() => this.getFood(this.state.current, "japanese")} className="cat-btns">
                Japanese
              </button>
            </div>
            <div className="filtered-list">{filteredList}</div>
          </div>
        </div>
      </div>
    );
  }
}
