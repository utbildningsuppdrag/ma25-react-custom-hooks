import { useEffect, useState } from 'react';
import PokemonListItem from '../pokemonlistitem/PokemonListItem';
import './pokemonList.css';
import { useFetch } from '../../hooks/useFetch';

const PokemonList = ({ setActivePokemon, search, isSeen }) => {
    const { data, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');

    const pokemonList = data?.results || [];

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
