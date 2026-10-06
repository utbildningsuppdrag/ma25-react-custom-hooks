import './pokemonDetails.css';

const PokemonDetails = ({
    details,
    loading,
    error
}) => {
    return (
        <section
            className="pokemon-details"
            aria-labelledby="pokemon-name"
        >
            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && !error && details && (
                <>
                    <header>
                        <p className="pokemon-details__number">
                            #{details.id}
                        </p>

                        <h2
                            id="pokemon-name"
                            className="pokemon-details__name"
                        >
                            {details.name}
                        </h2>
                    </header>

                    <figure className="pokemon-details__image">
                        {details.sprites.front_default ? (
                            <img
                                src={details.sprites.front_default}
                                alt={details.name}
                            />
                        ) : (
                            <span aria-hidden="true">?</span>
                        )}
                    </figure>

                    <p className="pokemon-details__types">
                        <span className="pokemon-details__type">
                            {details.types[0].type.name}
                        </span>
                    </p>

                    <dl className="pokemon-details__info">
                        <dt>Height</dt>
                        <dd>{details.height / 10} m</dd>

                        <dt>Weight</dt>
                        <dd>{details.weight / 10} kg</dd>
                    </dl>
                </>
            )}
        </section>
    );
};

export default PokemonDetails;