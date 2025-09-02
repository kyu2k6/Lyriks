import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const title =
    song?.title ??
    song?.attributes?.name ??
    'Unknown Title';
  const artist =
    song?.subtitle ??
    song?.attributes?.artistName ??
    'Unknown Artist';

  // Choose the image from multiple possible paths
  const imageUrl =
    song?.images?.coverart ??
    song?.images?.background ??
    song?.attributes?.artwork?.url
      ?.replace('{w}', '150')
      ?.replace('{h}', '150') ??
    "https://via.placeholder.com/150/000000/FFFFFF?text=No+Image";

  return (
    <div className="w-full flex flex-row items-center 
      hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}. </h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg object-cover"
          src={imageUrl}
          alt={title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.key}`}>
            <p className="text-xl font-bold text-white">{title}</p>
          </Link>
          <p className="text-ase text-gray-300 mt-1">{artist}</p>
        </div>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (isFetching) {
    return (
      <div ref={divRef} className="text-black flex items-center justify-center h-32">
        Loading top charts...
      </div>
    );
  }

  if (error) {
    return (
      <div ref={divRef} className="text-red-500 flex items-center justify-center h-32">
        Failed to load top charts.
      </div>
    );
  }

  const topPlays = Array.isArray(data) ? data.slice(0, 5) : [];

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* Top Charts */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard key={song?.key ?? i} song={song} i={i} 
            isPlaying = {isPlaying} activeSong = {activeSong} handlePauseClick = {handlePauseClick}
            handlePlayClick = {() => handlePlayClick(song, i)} />
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays.map((song, i) => {
            // Fallbacks for image
            const imageUrl =
              song?.images?.background ??
              song?.images?.coverart ??
              song?.attributes?.artwork?.url
                ?.replace('{w}', '150')
                ?.replace('{h}', '150') ??
              "https://via.placeholder.com/150/000000/FFFFFF?text=Artist";

            // Fallbacks for artist ID
            const artistId =
              song?.artists?.[0]?.adamid ??
              song?.relationships?.artists?.data?.[0]?.id ??
              '';

            // Fallbacks for artist name
            const artistName =
              song?.subtitle ??
              song?.attributes?.artistName ??
              'Unknown Artist';

            return (
              <SwiperSlide
                key={song?.key ?? i}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artistId}`}>
                  <img
                    src={imageUrl}
                    alt={artistName}
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
