import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  
  state = {
    searchText: '',
  
  }

  // dynamically builds quick links from info in this component's state
  buildQuickLinks() {
    const qLinks = this.props.links;
    return (
      qLinks.map( link => {
        return <li key={link.id}><NavLink to={link.path}>{link.displayText}</NavLink></li>
      })
    )
  }
  
  render() { 
    return( 
      <header>
        <SearchBar />
        <nav className="main-nav">
          <ul>
            {this.buildQuickLinks()}
          </ul>
        </nav>        
      </header>
    );
  }
}
