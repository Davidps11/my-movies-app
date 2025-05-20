'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Config from '@/config';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  from: string; // Para query string opcional
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, from }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="!overflow-visible"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}?from=${from}`}>
              <div className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition bg-white">
                <Image
                  src={Config.IMAGE_SOURCE + movie.poster_path}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="object-cover"
                />
                <div className="p-2 text-center font-medium">{movie.title}</div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
