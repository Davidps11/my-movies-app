import api from "../api";
export const getMovieById = async (id: string) => {
 try {
 const { data } = await api.get(`/movie/${id}`);
 return data;
 } catch (error) {
 throw error;
 }
};

export const getMovieRecommendations = async (movieId: string, page = 1) => {
    let res: any;
    const endpoint = `/movie/${movieId}/recommendations?language=en-US&page=${page}`;
    await api
      .get(endpoint)
      .then((d) => {
        res = d.data;
      })
      .catch((err) => {
        res = err.response;
      });
  
    return res;
  };