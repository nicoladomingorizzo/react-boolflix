
import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import Flag from "react-world-flags";
import getCountryCodeFromLanguage from "./db/language";

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [all, setAll] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  function handleSearchClick() {
    const ApiUrlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it-IT&query=${searchQuery}`;
    const ApiUrlSeries = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it-IT&query=${searchQuery}`;

    Promise.all([
      fetch(ApiUrlMovies)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results)
          return data.results
        }),
      fetch(ApiUrlSeries)
        .then(res => res.json())
        .then(data => {
          setSeries(data.results)
          return data.results
        })
    ])
      // console.log(movies, series)
      .then(([movies, series]) => {
        const seriesConverted = series.map(serie => ({
          id: serie.id,
          original_language: serie.original_language,
          title: serie.name,
          poster_path: serie.poster_path,
          original_title: serie.original_name
        }))
        const allTvMovies = [
          console.log(...movies),
          ...movies,
          ...seriesConverted
        ]
        setAll(allTvMovies);
      })
      .catch(err => {
        alert('Si è verificato un errore nel caricamento dei dati. Riprova più tardi')
      })
  }

  return (
    <>
      <div className="container-fluid m-3 d-flex justify-content-between align-items-center ">
        <a href="https://fontmeme.com/it/font-netflix/">
          <img src="https://fontmeme.com/permalink/250729/8e39c74dfe76376db306b3062fc14f7d.png" alt="font-netflix" border="0" />
        </a>
        <div className="me-3 mt-3 d-flex gap-2 align-items-center">
          <input type="text" className="px-2 py-1" placeholder='Cerca un film o una serie' onChange={e => setSearchQuery(e.target.value)} />
          <button className="btn btn-danger" onClick={handleSearchClick}>Cerca</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 container text-center mx-auto ">
        {all?.length > 0 ? (all?.map(item => {
          const countryCode = getCountryCodeFromLanguage(item?.original_language)
          return (
            <div key={item?.id} className="card col mx-5 my-3">
              <div className="card-body d-flex flex-column justify-content-between">
                <img
                  src={item?.poster_path
                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                    : "https://via.placeholder.com/342x513?text=Nessuna+immagine"}
                  alt={item?.title}
                />
                <p><strong>Titolo: </strong>{item?.title}</p>
                <p><strong>Titolo originale: </strong>{item?.original_title}</p>
                <p>
                  <strong>Lingua originale: </strong>{' '}
                  {countryCode ? (
                    <Flag code={countryCode} height='20' width='25' />
                  ) : (
                    item?.original_language
                  )}
                </p>
                <p><strong>Voto medio: </strong>{item?.vote_average?.toFixed(2)}</p>
              </div>
            </div>
          )
        })) : (
          <p className="mx-auto mt-5 fs-3 ">
            Nessun film o Serie.
          </p>
        )
        }
      </div>
    </>
  )
}

export default App
