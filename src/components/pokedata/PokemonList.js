import React, { Component, useState, useEffect } from 'react';

import { getFullList, getPokemonUrl, getFilterUrl } from "./dataFunctions";
import PokemonCard from './PokemonCard';
import Pagination from '../layout/Pagination';



export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(20);
  const [filter, setFilter] = useState(null);
  const fullListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=898';

  useEffect(() => {
    async function fetchData() {
      if (filter && filter.indexOf("Gen") === -1) {
        let filterUrl = getFilterUrl(filter);
        let response = await getFullList(filterUrl);
        await loadPokemon(response.pokemon);

      } else if (filter) {
        let filterUrl = getFilterUrl(filter);
        let response = await getFullList(filterUrl);
        await loadPokemon(response.results);

      } else {
        let response = await getFullList(fullListUrl);
        await loadPokemon(response.results);
      }

    }
    fetchData();
  }, [filter]);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const loadPokemon = async (data) => {
    let _pokemon = await Promise.all(
      data.map( async pokemon => {
        if (filter && filter.indexOf("Gen") === -1) {
          let pokemonRecord = getPokemonUrl(pokemon.pokemon);
          return pokemonRecord;

        } else {
          let pokemonRecord = getPokemonUrl(pokemon);
          return pokemonRecord;

        }
    }))
    setPokemonList(_pokemon);
    console.log(_pokemon);

  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const changeFilter = (newFilter) => {
    if (filter !== newFilter) {
      setFilter(newFilter);
      setCurrentPage(1);
    }
  }

  return (
    <>
      <div id="filters">
        <div className="row generations">
          <h3>Filter by generation:</h3>
          <button onClick={() => changeFilter(null)} value="Full List">Full List</button>
          <button onClick={() => changeFilter("Gen1")} value="Gen 1">Gen 1</button>
          <button onClick={() => changeFilter("Gen2")} value="Gen 2">Gen 2</button>
          <button onClick={() => changeFilter("Gen3")} value="Gen 3">Gen 3</button>
          <button onClick={() => changeFilter("Gen4")} value="Gen 4">Gen 4</button>
          <button onClick={() => changeFilter("Gen5")} value="Gen 5">Gen 5</button>
          <button onClick={() => changeFilter("Gen6")} value="Gen 6">Gen 6</button>
          <button onClick={() => changeFilter("Gen7")} value="Gen 7">Gen 7</button>
          <button onClick={() => changeFilter("Gen8")} value="Gen 8">Gen 8</button>
        </div>
        <div className="row types">
          <h3>Filter by type:</h3>
          <button onClick={() => changeFilter(null)} value="All">All</button>
          <button onClick={() => changeFilter("Normal")} value="Normal">Normal</button>
          <button onClick={() => changeFilter("Fire")} value="Fire">Fire</button>
          <button onClick={() => changeFilter("Water")} value="Water">Water</button>
          <button onClick={() => changeFilter("Grass")} value="Grass">Grass</button>
          <button onClick={() => changeFilter("Electric")} value="Electric">Electric</button>
          <button onClick={() => changeFilter("Ice")} value="Ice">Ice</button>
          <button onClick={() => changeFilter("Fighting")} value="Fighting">Fighting</button>
          <button onClick={() => changeFilter("Poison")} value="Poison">Poison</button>          
          <button onClick={() => changeFilter("Ground")} value="Ground">Ground</button>

          <button onClick={() => changeFilter("Flying")} value="Flying">Flying</button>
          <button onClick={() => changeFilter("Psychic")} value="Psychic">Psychic</button>
          <button onClick={() => changeFilter("Bug")} value="Bug">Bug</button>
          <button onClick={() => changeFilter("Rock")} value="Rock">Rock</button>
          <button onClick={() => changeFilter("Ghost")} value="Ghost">Ghost</button>
          <button onClick={() => changeFilter("Dark")} value="Dark">Dark</button>
          <button onClick={() => changeFilter("Dragon")} value="Dragon">Dragon</button>
          <button onClick={() => changeFilter("Steel")} value="Steel">Steel</button>          
          <button onClick={() => changeFilter("Fairy")} value="Fairy">Fairy</button>

        </div>

      </div>
      <div id="pagination">
        <Pagination postsPerPage={pokemonPerPage} totalPosts={pokemonList.length} paginate={paginate}/>
      </div>
      <div id="pokemon-list">
        <PokemonCard pokemon={currentPokemon} />
      </div>
    </>
  );
}