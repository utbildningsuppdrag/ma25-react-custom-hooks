import PokemonDetails from '../pokemondetails/PokemonDetails';
import PokemonList from '../pokemonlist/PokemonList';
import PokemonSearch from '../pokemonsearch/PokemonSearch';
import SeenCounter from '../seencounter/SeenCounter';
import './pokedex.css';

import { useEffect, useState } from 'react';

const Pokedex = () => {
    const [activePokemon, setActivePokemon] = useState(null);
    const [search, setSearch] = useState('');
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seenPokemon, setSeenPokemon] = useState([]);

    useEffect(() => {
        if (!activePokemon) return;

        const fetchPokemon = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${activePokemon}`
                );

                if (!response.ok) {
                    throw new Error('Could not fetch data');
                }

                const data = await response.json();

                setDetails(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [activePokemon]);

    const toggleSeen = (id) => {
        setSeenPokemon((current) =>
            current.includes(id)
                ? current.filter((pokemonId) => pokemonId !== id)
                : [...current, id]
        );
    };

    const isSeen = (id) => {
        return seenPokemon.includes(id);
    };

    return (
        <article className="pokedex">
            <section
                className="pokedex__left"
                aria-labelledby="pokemon-name"
            >
                <header className="pokedex__header">
                    <span
                        className="pokedex__lens"
                        aria-hidden="true"
                    ></span>

                    <p
                        className="pokedex__lights"
                        aria-hidden="true"
                    >
                        <span className="light light--red"></span>
                        <span className="light light--yellow"></span>
                        <span className="light light--green"></span>
                    </p>
                </header>

                <section className="pokedex__left-content">
                    <PokemonDetails
                        details={details}
                        loading={loading}
                        error={error}
                    />

                    <nav
                        className="pokedex__controls"
                        aria-label="Pokédex controls"
                    >
                        <button
                            className={`control-circle ${
                                details && isSeen(details.id)
                                    ? 'control-circle--seen'
                                    : ''
                            }`}
                            aria-label="Mark Pokémon as seen"
                            disabled={!details}
                            onClick={() => toggleSeen(details.id)}
                        >
                            {details && isSeen(details.id) ? '✓' : ''}
                        </button>

                        <section className="control-middle">
                            <p
                                className="control-lines"
                                aria-hidden="true"
                            >
                                <span></span>
                                <span></span>
                            </p>

                            <output className="control-display">
                                {details?.id
                                    ? details.id.toString().padStart(3, '0')
                                    : '000'}
                            </output>
                        </section>

                        <button
                            className="dpad"
                            aria-label="Navigation"
                        >
                            <span
                                className="dpad__horizontal"
                                aria-hidden="true"
                            ></span>

                            <span
                                className="dpad__vertical"
                                aria-hidden="true"
                            ></span>

                            <span
                                className="dpad__center"
                                aria-hidden="true"
                            ></span>
                        </button>
                    </nav>
                </section>
            </section>

            <span
                className="pokedex__hinge"
                aria-hidden="true"
            ></span>

            <section
                className="pokedex__right"
                aria-labelledby="pokedex-title"
            >
                <header className="pokedex__title">
                    <span
                        className="pokeball"
                        aria-hidden="true"
                    >
                        ●
                    </span>

                    <h1 id="pokedex-title">Pokédex</h1>
                </header>

                <PokemonSearch
                    search={search}
                    setSearch={setSearch}
                />

                <PokemonList
                    setActivePokemon={setActivePokemon}
                    search={search}
                    isSeen={isSeen}
                />

                <SeenCounter
                    seen={seenPokemon.length}
                    total={151}
                />
            </section>
        </article>
    );
};

export default Pokedex;
