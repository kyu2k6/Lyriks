const Track = ({ isPlaying, isActive, activeSong }) => {
  const cover =
    activeSong?.images?.coverart ||
    activeSong?.attributes?.artwork?.url?.replace('{w}', '400')?.replace('{h}', '400') ||
    activeSong?.attributes?.previews?.[0]?.url ||
    activeSong?.hub?.images?.cover ||
    '';

  return (
    <div className="flex-1 flex items-center justify-start">
      {/* spinning wheel */}
      <div
        className={`hidden sm:block h-16 w-16 mr-4 rounded-full overflow-hidden ${
          isActive && isPlaying ? 'spin-slow' : ''
        }`}
      >
        {cover ? (
          <img
            src={cover}
            alt={activeSong?.title || activeSong?.attributes?.name || 'cover'}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
            No cover
          </div>
        )}
      </div>

      {/* title/artist */}
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.title || activeSong?.attributes?.name || 'No active Song'}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle || activeSong?.attributes?.artistName || ''}
        </p>
      </div>
    </div>
  );
};


export default Track;
