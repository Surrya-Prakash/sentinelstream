import { Link } from 'react-router-dom';
import ProcessingStatus from './ProcessingStatus';
import { formatDuration, formatFileSize } from '../../utils/helpers';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} className="group block bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="aspect-video bg-black/50 relative overflow-hidden">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="material-symbols-outlined text-5xl text-gray-600 group-hover:text-primary transition-colors">play_circle</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white font-medium">
          {formatDuration(video.duration)}
        </div>
        
        {video.sensitivityResult && !video.sensitivityResult.isSafe && (
          <div className="absolute top-2 right-2 bg-red-500/90 text-white p-1 rounded-full" title="Sensitive Content Detected">
            <span className="material-symbols-outlined text-sm">warning</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-white font-medium line-clamp-2 leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
        </div>
        
        <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
          <span>{formatFileSize(video.filesize)}</span>
          <span>•</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>

        <ProcessingStatus status={video.status} progress={video.processingProgress} />
      </div>
    </Link>
  );
};

export default VideoCard;
