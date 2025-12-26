import { useEffect, useRef } from 'react';
import { getStreamUrl } from '../../services/videoService';

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video._id]);

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative group">
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        poster={video.thumbnail}
      >
        <source src={getStreamUrl(video._id)} type={video.mimetype} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
