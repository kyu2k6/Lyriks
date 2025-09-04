import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const songKey = song?.id;
  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
      backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-56 group">
        <div
          className="absolute inset-0 justify-center items-center 
          bg-black bg-opacity-50 hidden group-hover:flex"
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          className="w-full h-full rounded-lg"
          src={
            song.images?.coverart ||
            song.attributes?.artwork?.url
              ?.replace('{w}', '400')
              ?.replace('{h}', '400')
          }
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="text-white font-semibold text-lg truncate">
          <Link to={`/songs/${songKey}`}>
            {song.title || song.attributes?.name}
          </Link>
        </p>
        <p className="text-gray-300 text-sm truncate mt-1">
          <Link to={`/artists/${song?.artists?.[0]?.adamid}`}>
            {song.subtitle || song.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
