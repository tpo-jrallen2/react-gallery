import React from 'react';

export default function PhotoContainer(props) {


  console.log(props.match);
  // console.log(match);
  // const photoItems = props.photos[props.topic].map(photo => {
  //   return (
  //     <li key={photo.id}><img src={photo.link}></img></li>
  //   );
  // });


  // if (photoItems.length > 0) {
  //   return (
  //     <div className="photo-container">
  //       <h2>Results</h2>
  //       <ul>
  //         {photoItems}
  //       </ul>
  //     </div>
  //   );
  // } else {
    return (
      <li className="not-found">
        <h3>No Results Found</h3>
        <p>You search did not return any results. Please try again.</p>
      </li>
    );
  // }

}