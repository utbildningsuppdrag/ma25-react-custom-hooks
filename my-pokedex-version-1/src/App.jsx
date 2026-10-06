import bg from './assets/image.png';
import './App.css';
import Pokedex from './components/pokedex/Pokedex';

function App() {

  return (
    <section 
      className="app"
      style={{ backgroundImage : `url(${bg})`}}
    >
      <Pokedex />
    </section>
  )
}

export default App;
