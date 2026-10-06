import { useState } from 'react';

export const useSeenPokemon = () => {
    const [seenPokemon, setSeenPokemon] = useState(() => {
        const savedPokemon = JSON.parse(localStorage.getItem('seenPokemon'));
        return savedPokemon || [];
    });

    const toggleSeen = (id) => {
        setSeenPokemon(current => {
            const updatedPokemon = current.includes(id)
                ? current.filter(pokemonId => pokemonId !== id)
                : [...current, id]

            localStorage.setItem('seenPokemon', JSON.stringify(updatedPokemon));
            return updatedPokemon;
        });
    }

    const isSeen = (id) => {
        return seenPokemon.includes(id);
    }

    return {
        seenPokemon,
        toggleSeen,
        isSeen
    }
}

