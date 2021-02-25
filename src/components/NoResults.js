import React from 'react';
import { Link } from 'react-router-dom';

const NoResults = () => {
  return (
    <li className='not-found'>
      <h3>Didn't find any pictures to show you.</h3>
      <h3>I'm sorry..that's a bummer.</h3>
      <h3><Link to='/search/ducks'>Would some ducks cheer you up?</Link></h3>
    </li>
  );
};

export default NoResults;
