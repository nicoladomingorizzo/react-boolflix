import { useEffect, useState } from "react";

export default function AppHeader() {


    const ApiUrl = 'https://api.themoviedb.org/3/search/movie';
    const [movies, setMovies] = useState('');
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(ApiUrl)
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    }, []);

    return (
        <>
            <div className="container-fluid m-3 d-flex justify-content-between align-items-center ">
                <a href="https://fontmeme.com/it/font-netflix/">
                    <img src="https://fontmeme.com/permalink/250729/f783700a65bcd965448facb3e6c4617e.png" alt="font-netflix" border="0" />
                </a>
                <div className="me-3 mt-3 d-flex gap-2 align-itmens-center">
                    <input type="text" />
                    <button className="btn btn-outline" onClick={e => setMovies(e.target.value, API_KEY)}>Search</button>
                </div>
            </div>
        </>
    )
}