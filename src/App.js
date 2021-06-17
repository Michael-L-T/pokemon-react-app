import React, { useState, useEffect } from 'react';
import { getFullList, getPokemonUrl } from "./js/dataFunctions";
import PokemonContainer from './js/PokemonContainer';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const fullListUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getFullList(fullListUrl);
      // console.log(response);
      await loadPokemon(response.results);
    }
    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemon = await Promise.all(
      data.map( async pokemon => {
        let pokemonRecord = getPokemonUrl(pokemon);
        return pokemonRecord;
    }))
    setPokemonList(_pokemon);
    console.log(_pokemon);

  };



  return (
    <>
      <PokemonContainer pokemonList={pokemonList} />
    </>
  );
}

export default App;
