import './index.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import apiKey from './config';

import Header from './components/Header';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';
import SearchBar from './components/SearchBar';

class App extends Component {

  state = {
    isLoading: true,
    defaultTopic: 'airplanes',
    retrievedPhotoData: {},
    currentTopic: null
  }

  getFlickrResults = (searchTerm=this.state.defaultTopic) => {
    // call the flickr api 
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&safe_search=1&format=json&nojsoncallback=1&per_page=24`)
      .then( response => {
        // loop through all photos log the interpolated links and unique IDs to be used for keys 
        const returnedPhotoData = response.data.photos.photo.reduce((data, photo) => {
          const photoLink = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
          data.push(<li key={photo.id}><img src={photoLink} /></li>);
          return data;
        }, []);
        return returnedPhotoData;
      })
      .then(returnedPhotoData => {
        this.setState(prevState => { 
          let retrievedPhotoData = prevState.retrievedPhotoData;
          retrievedPhotoData[searchTerm] = returnedPhotoData;
          return { retrievedPhotoData: retrievedPhotoData, currentTopic: searchTerm, isLoading: false };
        });
      })
      .catch( err => console.log(err));
  }

  componentDidMount() {
    this.getFlickrResults();
    this.getFlickrResults('stars');
    this.getFlickrResults('forests');
    this.getFlickrResults('mountains');
  }


  retrievePhotoData = (topic) => {
    // if the data doesn't exist then go get it
    if(!this.state.retrievedPhotoData[topic]){
      this.getFlickrResults(topic);
    }
    // return the data to be used
    return this.state.retrievedPhotoData[topic];
  }

  render () {
    return (
      <BrowserRouter>
        <SearchBar onSearch={this.retrievePhotoData} />
        <Header />
        <Switch>
          <Route exact path='/' render={() => <PhotoContainer retrievePhotoData={this.retrievePhotoData} topic={this.state.defaultTopic} />} />
          <Route path='/search/:searchTerm' render={ ({match}) => <PhotoContainer retrievePhotoData={this.retrievePhotoData} match={match} />} />
          <Route exact path='/stars' render={() => <PhotoContainer retrievePhotoData={this.retrievePhotoData} topic='stars' />} />
          <Route exact path='/forests' render={() => <PhotoContainer retrievePhotoData={this.retrievePhotoData} topic='forests' />} />
          <Route exact path='/mountains' render={() => <PhotoContainer retrievePhotoData={this.retrievePhotoData} topic='mountains' />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
