import './pokemonSearch.css';

const PokemonSearch = ({ search, setSearch }) => {
    return (
        <form
            className="pokemon-search"
            onSubmit={(event) => event.preventDefault()}
        >
            <label htmlFor="pokemon-search">
                Search Pokémon
            </label>

            <input
                id="pokemon-search"
                type="search"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </form>
    );
};

export default PokemonSearch;