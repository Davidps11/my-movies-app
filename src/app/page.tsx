'use client';
import React, { useEffect, useState } from 'react';
import { getNowPlayingMovies } from '@/services/movies/getNowPlayingMovies';
import { getTopRatedMovies } from '@/services/movies/getTopRatedMovies';
import { getPopularMovies } from '@/services/movies/getPopularMovies';
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const now = await getNowPlayingMovies();
        const top = await getTopRatedMovies();
        const pop = await getPopularMovies();
        setNowPlaying(now.results || []);
        setTopRated(top.results || []);
        setPopular(pop.results || []);
      } catch (error) {
        console.error('Error loading movies for home:', error);
      }
    };
    fetchAll();
  }, []);

  const renderCarousel = (movies: any[]) => (
    <div className="flex overflow-x-auto gap-4 py-4 scroll-smooth snap-x">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
          <div className="flex-none w-40 snap-center bg-white rounded-lg shadow-md cursor-pointer">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/placeholder.jpg'
              }
              alt={movie.title}
              className="rounded-t-lg object-cover"
              width={160}
              height={240}
              unoptimized
            />
            <h3 className="text-center text-sm px-2 py-2">{movie.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">🎥 Bienvenido a MovieApp</h1>
      <p className="mb-8 text-gray-600">Explora las películas más destacadas del momento.</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-yellow-600">📽️ En Cartelera</h2>
        {renderCarousel(nowPlaying)}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-green-600">🌟 Mejor Calificadas</h2>
        {renderCarousel(topRated)}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-blue-600">🔥 Populares</h2>
        {renderCarousel(popular)}
      </section>
    </div>
  );
};

export default HomePage;
