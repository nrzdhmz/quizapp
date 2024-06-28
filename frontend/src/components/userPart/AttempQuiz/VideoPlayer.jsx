import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-container">
      <ReactPlayer url={url} controls className="video" />
    </div>
  );
};

export default VideoPlayer;
