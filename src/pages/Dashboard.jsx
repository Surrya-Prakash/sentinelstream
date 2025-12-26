import { useEffect } from 'react';
import { useVideo } from '../hooks/useVideo';
import VideoCard from '../components/video/VideoCard';
import Header from '../components/common/Header';

const Dashboard = () => {
  const { videos, fetchVideos, loading } = useVideo();

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage and monitor your video content</p>
          </div>

          <div className="flex gap-4">
            {/* Filter controls could go here */}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 bg-surface-dark rounded-xl border border-border-dark">
            <span className="material-symbols-outlined text-4xl text-gray-600 mb-4">videocam_off</span>
            <h3 className="text-lg font-medium text-white mb-2">No videos yet</h3>
            <p className="text-gray-400 mb-6">Upload your first video to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
