import './pokemonListItem.css';

const PokemonListItem = ({
    number,
    name,
    setActivePokemon,
    isSeen
}) => {
    return (
        <li
            className="pokemon-list-item"
            onClick={() => setActivePokemon(name)}
        >
            <span>#{number}</span>

            <strong>{name}</strong>

            <span
                className="pokemon-list-item__seen"
                aria-label={isSeen(number) ? 'Seen' : 'Not seen'}
            >
                {isSeen(number) ? '✓' : '○'}
            </span>
        </li>
    );
};

export default PokemonListItem;