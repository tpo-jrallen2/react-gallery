import logo from './logo.svg';
import './index.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import apiKey from './config.js';
import axios from 'axios';
import Header from './components/Header';
import PhotoContainer from './components/PhotoContainer';


const key = apiKey;

export default class  App extends Component {

  constructor() {
    super(); 
    this.state = {
      loading: true,
      retrievedPhotoData: {},
      staticTopics: [
        {
          id: 0,
          path: '/stars',
          displayText: 'Stars'
        },
        {
          id: 1,
          path: '/waterfalls',
          displayText: 'Waterfalls'
        },
        {
          id: 2,
          path: '/forests',
          displayText: 'Forests'
        }
      ]
    };
  }

  getFlickrResults = (searchTerm="waterfalls") => {
    // call the flickr api 
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=256b0dba48f3cbd0009b06773fe551e6&tags=${searchTerm}&safe_search=1&format=json&nojsoncallback=1&per_page=24`)
      .then( response => {
        // loop through all photos log the interpolated links and unique IDs to be used for keys 
        const returnedPhotoData = response.data.photos.photo.reduce((data, photo) => {
          data.push({
            link: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
            id: photo.id
          });
          return data;
        }, []);
        // below object assign code shamelessly paraphrased from https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        this.setState(prevState => { 
          let retrievedPhotoData = prevState.retrievedPhotoData;
          retrievedPhotoData[searchTerm] = returnedPhotoData;
          return { retrievedPhotoData };
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
      <BrowserRouter>
        <Header links={this.state.staticTopics}/>
          <Switch>
            <Route exact path="/" />
            {this.state.staticTopics.map(topic => 
              (<Route 
                key={topic.id} 
                path={topic.path} 
                render={ () => <PhotoContainer 
                getFlickrResults={this.getFlickrResults}
                  /> } 
              />))
            }
          </Switch>
      
      </BrowserRouter>
    );
  }
}
