import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      homes: [
        {
          address: "4219 E Colter St",
          city: "Phoenix",
          state: "Arizona",
          zipcode: 85018,
          image:
            "https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-with-green-grass-and-landscaped-yard-picture-id856794670?k=6&m=856794670&s=612x612&w=0&h=gneLQSj2K6CzxU4r7DG_HUjd00ZMiZnYhYW_R0goPZ4="
        }
      ],
      yelpRes: null
    };
  }
  getFood = () => {
    let address = "4219 E Colter St, Phoenix, AZ 85018";
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${address}`, {
        headers: {
          Authorization:
            "Bearer kI2kwj0Xe-eSbRpBDk9XGP5YWVejR0KvPN3aisNyX36Fr6NzMAto9Au1EpFHCy0PKzDFSxjnSopUOf6lKYQTz1NsAWAwLh6SMLTwMzhlP3XJzcVxsScXKc4ChDqVXHYx"
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          yelpRes: res.data.businesses
        });
      });
  };

  render() {
    const listFood =
      this.state.yelpRes &&
      this.state.yelpRes.map(place => {
        return (
          <div className="yelp-response" key={place.id}>
            <h1>{place.name}</h1>
            <h2>{place.location.address1}</h2>
            <p>{place.phone}</p>
            <p>{place.price}</p>
            <p>
              {place.rating}/5 based on {place.review_count} ratings
            </p>
          </div>
        );
      });

    const filterListings = this.state.homes.map(home => {
      return (
        <div>
          <img src={home.image} width={200} />
          <p>{home.address}</p>
          <p>
            {home.city}, {home.state} {home.zipcode}
          </p>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="header">
          <h1>YummyHome</h1>
        </div>
        <div className="first-panel">
          <div className="panel-text">
            <p>Welcome to YummyHome.</p>
            <p>We help you find a home that has good food nearby!</p>
          </div>
        </div>
        <div className="middle-panel">
          <p className="middle-text">
            Here at <span>YummyHome</span> we help you find your yummiest home. Check out our listings, find your dream home, then we'll tell you the
            best food surrounding your new home.
          </p>
          <div className='icons'>
          <i class="fas fa-utensils"></i>
          <i class="fas fa-home"></i>
          </div>
          <button>Get started</button>


        </div>
        <div className="search-homes">
          <input onChange={e => this.setState({ search: e.target.value })} />
          {filterListings}
        </div>
        <button onClick={() => this.getFood()}>Hit that api</button>
        <div className="food-grid">{listFood}</div>
      </div>
    );
  }
}

export default App;
