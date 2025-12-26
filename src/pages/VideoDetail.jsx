import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import VideoPlayer from '../components/video/VideoPlayer';
import ProcessingStatus from '../components/video/ProcessingStatus';
import { getVideoById, deleteVideo } from '../services/videoService';
import { formatDuration, formatFileSize } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const data = await getVideoById(id);
      setVideo(data.video);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(id);
        navigate('/dashboard');
      } catch (err) {
        alert('Failed to delete video');
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      
      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer video={video} />
            
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{formatFileSize(video.filesize)}</span>
                <span>•</span>
                <span>{formatDuration(video.duration)}</span>
              </div>
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Description</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {video.description || 'No description provided.'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Processing Status</h3>
              <ProcessingStatus status={video.status} progress={video.processingProgress} />
            </div>

            {video.sensitivityResult && (
              <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Content Analysis</h3>
                
                <div className={`p-4 rounded-lg mb-4 flex items-start gap-3 ${video.sensitivityResult.isSafe ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  <span className="material-symbols-outlined text-xl mt-0.5">
                    {video.sensitivityResult.isSafe ? 'check_circle' : 'warning'}
                  </span>
                  <div>
                    <p className="font-medium">{video.sensitivityResult.isSafe ? 'Content Safe' : 'Sensitive Content Detected'}</p>
                    <p className="text-sm opacity-80 mt-1">{video.sensitivityResult.analysis}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Confidence Score</span>
                    <span className="text-white">{(video.sensitivityResult.confidence * 100).toFixed(1)}%</span>
                  </div>
                  {video.sensitivityResult.flags.length > 0 && (
                     <div>
                       <span className="text-gray-400 text-sm block mb-2">Flags</span>
                       <div className="flex flex-wrap gap-2">
                         {video.sensitivityResult.flags.map((flag, i) => (
                           <span key={i} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded uppercase tracking-wide">
                             {flag}
                           </span>
                         ))}
                       </div>
                     </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution</span>
                  <span className="text-white">{video.metadata?.resolution || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Frame Rate</span>
                  <span className="text-white">{video.metadata?.frameRate || 'N/A'} fps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Codec</span>
                  <span className="text-white uppercase">{video.metadata?.codec || 'N/A'}</span>
                </div>
              </div>
            </div>

            {(user.role === 'admin' || user._id === 'editor') && (
              <button 
                onClick={handleDelete}
                className="w-full py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">delete</span>
                Delete Video
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoDetail;
