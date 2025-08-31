import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId, activeSong, isPlaying } = useSelector((state) => state.player);

  // Fetch top charts globally
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  // Filter songs by genre locally
  const filteredSongs = genreListId
    ? data?.filter((song) =>
        song.attributes.genreNames.includes(genreListId)
      )
    : data;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title || 'Pop';

  return (
    <div className="flex flex-col">
      {/* Header + Genre Dropdown */}
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'Pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* Songs Grid */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {filteredSongs?.map((song, i) => (
          <SongCard
            key={song.id} // unique API id
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={filteredSongs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;