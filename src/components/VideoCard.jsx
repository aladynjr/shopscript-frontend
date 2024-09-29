import React from 'react';

const VideoCard = ({ submission }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-md">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.tiktok.com/embed/${submission.videoLink.split('/').pop()}`}
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{submission.brand}</h3>
        <p className="text-sm text-gray-600">{submission.category}</p>
      </div>
    </div>
  );
};

export default VideoCard;