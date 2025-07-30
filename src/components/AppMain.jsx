import Flag from "react-world-flags";

function AppMain({ data, getRating, loading, getCountryCodeFromLanguage }) {
    if (loading) {
        return <p className="text-center fs-4 mt-4">Caricamento in corso...</p>;
    }

    return (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 container text-center mx-auto">
            {data?.length > 0 ? (
                data.map(item => {
                    const countryCode = getCountryCodeFromLanguage(item?.original_language);
                    return (
                        <div key={item?.id} className="card col mx-5 my-3">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <img
                                    src={
                                        item?.poster_path
                                            ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                                            : "https://via.placeholder.com/342x513?text=Nessuna+immagine"
                                    }
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
                                <p><strong>Voto medio: </strong>{getRating(item?.vote_average)}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="mx-auto mt-5 fs-3">Nessun film o Serie.</p>
            )}
        </div>
    );
}

export default AppMain;