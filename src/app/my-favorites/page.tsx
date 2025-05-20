'use client';
import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { IMovieDetail } from "@/types/IMovieDetail";
import { useSearchParams, useRouter } from "next/navigation";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId);
        setMovies(data?.results || []);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, page]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>

      {loading && (
        <h5 className="text-lg text-gray-500">Loading favorites...</h5>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don't have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie's detail page and click <strong>Add to Favorites</strong> to see it here.
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <MovieList movies={movies} from="favorites" />
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

export default MyFavoritesPage;
