import { useState } from "react";

function AppHeader({ searchQuery, setSearchQuery, onSearch, allGen }) {

    const [genreFilter, setGenreFilter] = useState('')
    return (
        <div className="container-fluid p-3 d-flex flex-wrap align-content-center justify-content-between align-items-center text-center bg-dark ">
            <a href="https://fontmeme.com/it/font-netflix/">
                <img
                    src="https://fontmeme.com/permalink/250729/8e39c74dfe76376db306b3062fc14f7d.png"
                    alt="font-netflix"
                    border="0"
                />
            </a>
            <div className="me-3 mt-3 d-flex gap-2 d-flex align-items-center">
                <select className='p-2 rounded bg-dark text-white' >
                    <option value="">Seleziona il genere</option>
                    {(() => {
                        const ids = [];
                        return allGen?.filter(genre => {
                            if (!genre?.id || !genre?.name) return false;
                            if (!genre.name.toLowerCase().includes(genreFilter.toLowerCase())) return false;   // filtro in base al nome che imposto in modo che sia case insensitive
                            if (ids.includes(genre.id)) return false; // elimino i doppioni 
                            ids.push(genre.id);
                            return true;
                        }).map(genre => (
                            <option key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                        ));
                    })()}
                </select>
                <input
                    type="text"
                    className="p-1 rounded bg-dark text-white"
                    placeholder="Cerca un film o una serie"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && onSearch()}
                />
                <button className="btn btn-danger text-dark" onClick={onSearch}>
                    Cerca
                </button>
            </div>
        </div>
    );
}

export default AppHeader;