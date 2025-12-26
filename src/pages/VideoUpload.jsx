import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import DropZone from '../components/upload/DropZone';
import { useVideo } from '../hooks/useVideo';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const { uploadVideo } = useVideo();
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
    // Auto-fill title from filename
    setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await uploadVideo(formData, (progress) => {
        setUploadProgress(progress);
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.error || 'Upload failed. Please check the file type and size.');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />

      <main className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Upload Video</h1>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-8">
          {!file ? (
            <DropZone onFileSelect={handleFileSelect} />
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </div>
              )}
              <div className="flex items-start gap-4 p-4 bg-background-dark rounded-lg border border-border-dark">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">movie</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium truncate">{file.name}</h3>
                  <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1.5">Video Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-background-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1.5">Description</label>
                  <textarea
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-background-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Describe your video..."
                  />
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setFile(null)}
                  className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:text-white font-medium ml-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !title}
                  className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUploading ? (
                    'Uploading...'
                  ) : (
                    <>
                      <span className="material-symbols-outlined">upload</span>
                      Start Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoUpload;
