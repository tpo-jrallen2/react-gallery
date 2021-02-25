import React from 'react';
import PhotoContainer from './PhotoContainer';

const Search = (props) => {
  const searchTerm = props.match.params.searchTerm;
  console.log(searchTerm);

  return (
    <PhotoContainer topic={searchTerm} photoData={props.photoData} />
  );
}
export default Search;
