import { useEffect, useState } from 'react';
import PokemonListItem from '../pokemonlistitem/PokemonListItem';
import './pokemonList.css';

const PokemonList = ({ setActivePokemon, search, isSeen }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
                );

                if (!response.ok) {
                    throw new Error('Could not fetch data');
                }

                const data = await response.json();

                setPokemonList(data.results);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul className="pokemon-list">
            {filteredPokemon.map((pokemon) => (
                <PokemonListItem
                    number={pokemonList.indexOf(pokemon) + 1}
                    name={pokemon.name}
                    key={pokemon.name}
                    setActivePokemon={setActivePokemon}
                    isSeen={isSeen}
                />
            ))}
        </ul>
    );
};

export default PokemonList;
