import logo from './logo.svg';
import './index.css';
import React, { Component } from 'react';

import apiKey from './config.js';

import axios from 'axios';
import SearchBar from './components/SearchBar';


const key = apiKey;

export default class  App extends Component {

  constructor() {
    super(); 
    this.state = {
      photos: [],
      loading: true
    };
  }

  getFlickrResults = () => {
    // call the flickr api 
    axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=256b0dba48f3cbd0009b06773fe551e6&tags=waterfall&safe_search=1&format=json&nojsoncallback=1&per_page=24')
      .then( response => {
        const photoData = response.data.photos.photo;
        // loop through all photos 
        photoData.map( photo => {
          const photoLink = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
          // add the built photo link to state to be used to display on the page 
          this.setState(prevState => ({
            photos: [...prevState.photos, photoLink]
          }))
        });
      })
      .then(this.setState({ loading: false }))
      .catch( err => console.log(err));

  }

  componentDidMount() {
    this.getFlickrResults();
  }

  render() {
    return (
      <div className="container">
        <SearchBar />

      </div>
    );
  }
}
