import { useEffect, useState } from "react";

export default function AppHeader() {


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
        </>
    )
}