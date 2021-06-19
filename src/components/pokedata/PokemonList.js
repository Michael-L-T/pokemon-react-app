import React, { Component, useState, useEffect } from 'react';

import { getFullList, getPokemonUrl } from "./dataFunctions";
import PokemonCard from './PokemonCard';
import Pagination from '../layout/Pagination';



export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(20);
  const fullListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=898';

  useEffect(() => {
    async function fetchData() {
      let response = await getFullList(fullListUrl);

      await loadPokemon(response.results);
    }
    fetchData();
  }, []);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const loadPokemon = async (data) => {
    let _pokemon = await Promise.all(
      data.map( async pokemon => {
        let pokemonRecord = getPokemonUrl(pokemon);
        return pokemonRecord;
    }))
    setPokemonList(_pokemon);
    console.log(_pokemon);

  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div id="pagination">
        <Pagination postsPerPage={pokemonPerPage} totalPosts={pokemonList.length} paginate={paginate}/>
      </div>
      <div id="pokemon-list">
        <PokemonCard pokemon={currentPokemon} />
      </div>
    </>
  );
}