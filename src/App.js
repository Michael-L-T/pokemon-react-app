import React, { useState, useEffect } from 'react';
import { getFullList } from "./js/dataFunctions";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const fullListUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getFullList(fullListUrl);
      console.log(response);
    }
    fetchData();
  }, []);

  return (
    <div>

    </div>
  );
}

export default App;
