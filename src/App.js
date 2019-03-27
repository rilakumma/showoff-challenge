import React, { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { houses } from "./Houses";

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      homes: [],
      getStarted: false,
      open: false,
      selectedHome: ""
    };
  }
  componentDidMount() {
    this.setState({
      homes: houses
    });
  }

  toggleModal = home => {
    this.setState({
      open: !this.state.open,
      selectedHome: home
    });
  };

  render() {
    const filter = this.state.homes.filter(home => home.zipcode.startsWith(this.state.search) && home);
    const filterListings =
      filter.length > 0 ? (
        filter.map(home => {
          return (
            <div className="listing">
              <img src={home.image} alt="house" className="listing-photo" />
              <p>{home.address}</p>
              <p>
                {home.city}, {home.state} <br />
                {home.zipcode}
              </p>
              <p>{home.price}</p>
              <span onClick={() => this.toggleModal(home)} className="expand">
                <i className="fas fa-chevron-right" />
              </span>
            </div>
          );
        })
      ) : (
        <div>Sorry, we currently don't have any homes that match your search.</div>
      );

    return (
      <div className="App">
        <div className="first-panel">
          <div className="panel-text">
            <p>Welcome to YummyHome.</p>
            <p>We help you find a home that has good food nearby!</p>
          </div>
        </div>
        <div className="middle-panel">
          <div className="icons">
            <i className="fas fa-home" />
          </div>
          <p className="middle-text">
            Here at <span>YummyHome</span> we help you find your yummiest home. Check out our listings, find your dream home, and we will
            tell you the best food surrounding your new home.
          </p>
          <div className="icons">
            <i className="fas fa-utensils" />
          </div>
          <button onClick={() => this.setState({ getStarted: !this.state.getStarted })} className="get-started">
            Get started
          </button>
        </div>

        <div className={this.state.getStarted ? "search-homes" : "search-homes-hide"}>
          <input
            onChange={e => this.setState({ search: e.target.value })}
            className="search-bar"
            placeholder="Enter zipcode Ex. 85018, 85016, 85251"
          />
          {this.state.open && <Modal home={this.state.selectedHome} toggle={this.toggleModal} />}
          {filterListings}
        </div>

        <div className="bottom-panel" />
      </div>
    );
  }
}

export default App;
