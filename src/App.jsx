
import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import Flag from "react-world-flags";
import getCountryCodeFromLanguage from "./db/language";

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  function handleSearchClick() {
    const ApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

    fetch(ApiUrl)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results)
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
          <input type="text" className="px-2 py-1" onChange={e => setSearchQuery(e.target.value)} />
          <button className="btn btn-outline" onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 container text-center mx-auto ">
        {movies.length > 0 ? (movies?.map(movie => {
          const countryCode = getCountryCodeFromLanguage(movie.original_language)
          return (
            <div key={movie.id} className="card col mx-5 my-3">
              <div className="card-body d-flex flex-column justify-content-between">
                <p><strong>Titolo del film: </strong>{movie.title}</p>
                <p><strong>Titolo originae del film: </strong>{movie.original_title}</p>
                <p>
                  <strong>Lingua originale: </strong>{' '}
                  {countryCode ? (
                    <Flag code={countryCode} height='20' width='25' />
                  ) : (
                    movie.original_language
                  )

                  }
                </p>
                <p><strong>Voto medio: </strong>{movie.vote_average.toFixed(2)}</p>
              </div>
            </div>
          )
        })) : (
          <p className="mx-auto mt-5 fs-3 ">
            Nessun film trovato con questo nome.
            <br />
            Cercane un altro</p>
        )
        }
      </div>
    </>
  )
}

export default App
