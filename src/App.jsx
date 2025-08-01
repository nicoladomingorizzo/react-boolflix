import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import getCountryCodeFromLanguage from "./db/language";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [all, setAll] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [genresMovies, setGenresMovies] = useState([]);
  const [genresSeries, setGenresSeries] = useState([]);
  const [genresAll, setGenresAll] = useState([]);

  useEffect(() => {

    const ApiUrlMoviesGenresList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const ApiUrlSeriesGenresList = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;

    Promise.all([
      fetch(ApiUrlMoviesGenresList)
        .then(res => {
          return res.json()
        }),
      fetch(ApiUrlSeriesGenresList)
        .then(res => res.json())
    ])
      .then(([moviesGenresData, SeriesGenresData]) => {
        setGenresMovies(moviesGenresData?.genres);
        setGenresSeries(SeriesGenresData?.genres);
        const combinedGenres = [...moviesGenresData?.genres, ...SeriesGenresData?.genres];
        //Ho aggiunto questo così filtro direttamente i generi prima di passarli 
        const ids = [];
        const uniqueGenres = combinedGenres.filter(genre => {
          if (!genre?.id) return false;
          if (ids.includes(genre.id)) return false;
          ids.push(genre.id);
          return true;
        });
        setGenresAll(uniqueGenres);

      })
  }, [])

  function handleSearchClick() {
    if (!searchQuery) return;

    setLoading(true);

    const ApiUrlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it-IT&query=${searchQuery}`;
    const ApiUrlSeries = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it-IT&query=${searchQuery}`;

    Promise.all([
      fetch(ApiUrlMovies)
        .then(res => res.json()),
      fetch(ApiUrlSeries)
        .then(res => res.json())
    ])
      .then(([moviesData, seriesData]) => {
        setMovies(moviesData.results);
        setSeries(seriesData.results);

        const seriesConverted = seriesData.results.map(serie => ({
          id: serie.id,
          original_language: serie.original_language,
          title: serie.name,
          poster_path: serie.poster_path,
          original_title: serie.original_name,
          vote_average: serie.vote_average,
        }));

        const allTvMovies = [...moviesData.results, ...seriesConverted];
        setAll(allTvMovies);
      })
      .catch(err => {
        alert('Errore durante il caricamento. Riprova più tardi.');
      })
      .finally(() => setLoading(false));
  }

  function getRating(vote) {
    const stars = [];
    const rounded = Math.floor(vote / 2);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i key={i} className={`bi ${i < rounded ? 'bi-star-fill' : 'bi-star'} text-warning`}></i>
      );
    }
    return stars;
  }

  return (
    <>
      <AppHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearchClick}
        allGen={genresAll}
      />
      <AppMain
        data={all}
        getRating={getRating}
        loading={loading}
        getCountryCodeFromLanguage={getCountryCodeFromLanguage}
      />
    </>
  );
}

export default App;
