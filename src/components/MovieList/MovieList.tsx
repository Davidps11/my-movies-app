import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface MovieListProps {
  movies?: Movie[]; // <-- lo marcamos como opcional
  from: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies = [], from }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No hay películas para mostrar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={{
            pathname: `/movie/${movie.id}`,
            query: { from },
          }}
          passHref
        >
          <div>
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              releaseYear={
                movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : 0
              }
              description={movie.overview}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
