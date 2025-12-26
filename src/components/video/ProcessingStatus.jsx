const ProcessingStatus = ({ status, progress }) => {
  if (status === 'completed') {
    return (
      <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
        <span className="material-symbols-outlined text-sm">check_circle</span>
        Ready to view
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center gap-1.5 text-red-400 text-xs font-medium">
        <span className="material-symbols-outlined text-sm">error</span>
        Processing failed
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-blue-400 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="animate-spin material-symbols-outlined text-sm">sync</span>
          Processing...
        </span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;
