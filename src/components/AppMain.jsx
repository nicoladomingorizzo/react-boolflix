import Flag from "react-world-flags";

function AppMain({ data, getRating, loading, getCountryCodeFromLanguage }) {
    if (loading) {
        return <p className="text-center fs-4 mt-4">Caricamento in corso...</p>;
    }

    return (
        <div className="bg-dark">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 container text-center mx-auto text-white">
                {data?.length > 0 ? (
                    data.map(item => {
                        const countryCode = getCountryCodeFromLanguage(item?.original_language);
                        return (
                            <div key={item?.id} className=" col my-3">
                                <div className="card h-100 border-0 bg-dark text-white">
                                    <figure className="card-img">
                                        <img
                                            src={
                                                item?.poster_path
                                                    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                                                    : "https://via.placeholder.com/342x513?text=Nessuna+immagine"
                                            }
                                            alt={item?.title}
                                            className="w-100 h-100"
                                        />
                                    </figure>
                                    <div className=" card-info d-flex flex-column justify-content-between hidden py-3 px-2">
                                        <p><strong className="text-danger">Titolo: </strong>{item?.title}</p>
                                        <p><strong className="text-danger">Titolo originale: </strong>{item?.original_title}</p>
                                        <p className="truncate"><strong className="text-danger">Descrizione: </strong>{item?.overview}</p>
                                        {/* <p><strong>Attori: </strong>{item?.id?.credits?.cast}</p> */}
                                        <p>
                                            <strong className="text-danger">Lingua originale: </strong>{' '}
                                            {countryCode ? (
                                                <Flag code={countryCode} height='30' width='35' />
                                            ) : (
                                                item?.original_language
                                            )}
                                        </p>
                                        <p><strong className="text-danger">Voto medio: </strong>{getRating(item?.vote_average)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="mx-auto my-5 fs-3 vh-100">Nessun Film/Serie selezionati.</p>
                )}
            </div >
        </div>
    );
}

export default AppMain;

/*
Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno 
parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti 
dall’API con Nome e Cognome, e i generi associati al film con questo schema: 
“Genere 1, Genere 2, ...”
*/