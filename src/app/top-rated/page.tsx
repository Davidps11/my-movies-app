'use client';
import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";
import { useSearchParams, useRouter } from "next/navigation";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getTopRatedMovies(page);
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error loading top rated movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [page]);

  const goToPage = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated</h3>
      {loading ? (
        <h5 className="text-lg text-gray-500">Cargando...</h5>
      ) : (
        <>
          <MovieList movies={movies} from="top-rated" />
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={() => goToPage(page - 1)} disabled={page <= 1} className="px-4 py-2 bg-gray-300 rounded">
             Anterior
            </button>
            <span className="self-center">Página {page}</span>
            <button onClick={() => goToPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TopRatedClientPage;
