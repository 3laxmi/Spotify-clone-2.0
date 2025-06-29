
import React, { useState } from 'react';
import Navbar from './Navbar';
import { albumsData, songsData } from '../assets/assets';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';

const DisplayHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const getGenreFromAlbumName = (name) => {
    if (name.includes('Top')) return 'Top Charts';
    if (name.includes('Trending')) return 'Trending';
    if (name.includes('Mega') || name.includes('Happy')) return 'Mood Boosters';
    return 'Others';
  };

  const filteredAlbums = albumsData.filter((album) => {
    const matchesSearch = album.name.toLowerCase().includes(searchQuery.toLowerCase());
    const albumGenre = getGenreFromAlbumName(album.name);
    if (selectedGenre === 'All') return matchesSearch;
    return matchesSearch && albumGenre === selectedGenre;
  });

  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const genreOptions = ['All', 'Top Charts', 'Trending', 'Mood Boosters', 'Others'];

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="mt-4 mb-6">
        <label htmlFor="genreFilter" className="text-white font-semibold mr-2">
          Filter by Genre:
        </label>
        <select
          id="genreFilter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-400">No albums found.</p>
          )}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
          {filteredSongs.length > 0 ? (
            filteredSongs.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-400">No songs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
