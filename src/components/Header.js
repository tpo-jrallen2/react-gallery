import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className='main-nav'>
        <ul>
          <li><NavLink to='/stars'>Stars</NavLink></li>
          <li><NavLink to='/mountains'>Mountains</NavLink></li>
          <li><NavLink to='/forests'>Forests</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
