import React from 'react';

import PhotoContainer from './PhotoContainer';

const Home = (props) => {
  return (
    <PhotoContainer photoData={props.photoData} />
  );
};

export default Home;
