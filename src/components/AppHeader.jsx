function AppHeader({ searchQuery, setSearchQuery, onSearch }) {
    return (
        <div className="container-fluid m-3 d-flex justify-content-between align-items-center">
            <a href="https://fontmeme.com/it/font-netflix/">
                <img
                    src="https://fontmeme.com/permalink/250729/8e39c74dfe76376db306b3062fc14f7d.png"
                    alt="font-netflix"
                    border="0"
                />
            </a>
            <div className="me-3 mt-3 d-flex gap-2 align-items-center">
                <input
                    type="text"
                    className="px-2 py-1"
                    placeholder="Cerca un film o una serie"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && onSearch()}
                />
                <button className="btn btn-danger" onClick={onSearch}>
                    Cerca
                </button>
            </div>
        </div>
    );
}

export default AppHeader;