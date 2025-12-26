import { useRef, useState } from 'react';

const DropZone = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300
        flex flex-col items-center justify-center gap-4 text-center group
        ${isDragOver 
          ? 'border-primary bg-primary/10 scale-[1.02]' 
          : 'border-gray-700 hover:border-gray-500 hover:bg-white/5'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => onFileSelect(e.target.files[0])}
        accept="video/*"
        className="hidden"
      />
      
      <div className={`p-4 rounded-full transition-colors ${isDragOver ? 'bg-primary/20 text-primary' : 'bg-surface-dark text-gray-400 group-hover:text-white'}`}>
        <span className="material-symbols-outlined text-4xl">cloud_upload</span>
      </div>
      
      <div className="space-y-1">
        <p className="text-lg font-medium text-white">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-400">MP4, MOV, or AVI (Max 500MB)</p>
      </div>
    </div>
  );
};

export default DropZone;
