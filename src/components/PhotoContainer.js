import React from 'react';
import NoResults from './NoResults';

const PhotoContainer = (props) => {
  let photoTopic;
  let matchTerm;

  try {
    matchTerm = props.match.params.searchTerm;
  } catch (error) {
    console.log(error);
  }

  if (matchTerm) {
    photoTopic = matchTerm;
  } else {
    photoTopic = props.topic;
  }

  const photoData = props.retrievePhotoData(photoTopic);

  // data doesn't exist yet so display loading to user 
  if (!photoData) {
    return (
      <h4>Loading....</h4>
    );
  // if at least 1 photo returned display it 
  } else if (photoData.length > 0) {
    return (
      <div className='photo-container'>
        <h3>{`Found some pictures of ${photoTopic} for you.`}</h3>
        <h4>Click a topic above, or search for something completely new!</h4>
        <ul>
          {photoData}
        </ul>
      </div>
    );
  // no results to display
  } else {
    return (
      <NoResults />
    );
  }
};

export default PhotoContainer;
