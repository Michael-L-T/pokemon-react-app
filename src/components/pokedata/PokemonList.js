import React, { Component, useState, useEffect } from 'react';

import { getFullList, getPokemonUrl } from "./dataFunctions";
import PokemonCard from './PokemonCard';


export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const fullListUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getFullList(fullListUrl);
      setNextPage(response.next);
      setPrevPage(response.previous);

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

  const next = async () => {
    let data = await getFullList(nextPage);
    await loadPokemon(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);

  };

  const prev = async () => {
    let data = await getFullList(prevPage);
    await loadPokemon(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
  };

  return (
    <>
      <PokemonCard pokemon={pokemonList} />
    </>
  );
}