'use client';
import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList"; // Asegúrate que la ruta esté bien
import { useSearchParams, useRouter } from "next/navigation";


const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [page]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular</h3>
      {loading ? (
        <h5 className="text-lg text-gray-500">Cargando...</h5>
      ) : (
        <>
          <MovieList movies={movies} from="popular" />
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={() => router.push(`?page=${page - 1}`)} disabled={page <= 1} className="px-4 py-2 bg-gray-300 rounded">
              ⬅️ Anterior
            </button>
            <span className="self-center">Página {page}</span>
            <button onClick={() => router.push(`?page=${page + 1}`)} className="px-4 py-2 bg-gray-300 rounded">
              Siguiente ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PopularClientPage;
