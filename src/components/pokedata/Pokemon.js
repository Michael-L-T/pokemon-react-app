import React, { Component } from 'react';

import { getPokemonUrl } from "./dataFunctions";

export default class Pokemon extends Component {

    state = {
        data: [],
        sprites: [],
        types: [],
        stats: [],
        description: '',
        abilities: [],
    }

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        let pokemonRes = await fetch(pokemonUrl);
        let data = await pokemonRes.json();
        this.setState( {data}  );

        const sprites = this.state.data.sprites;
        this.setState( {sprites} );

        const types = this.state.data.types;
        this.setState( {types});

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        });
        this.setState({ stats: {
            hp,
            attack, 
            defense,
            speed,
            specialAttack,
            specialDefense
        }})

        const abilities = data.abilities;
        this.setState( {abilities} );
        console.log(abilities);

        let speciesRes = await fetch(pokemonSpeciesUrl);
        let speciesData = await speciesRes.json();
        const flavorText = speciesData.flavor_text_entries;
        const description = flavorText[0].flavor_text;
        this.setState({description});

    }


    render() {
        const pokemon = this.state.data;
        return (
            <div className="PokemonContainer" id={pokemon.name} key={pokemon.name}>
                <div className="img">
                    <img src={this.state.sprites.front_default} alt="" />
                    <img src={this.state.sprites.back_default} alt="" />
                    </div>
                <div className="id">{pokemon.name} (#{pokemon.id})</div>

                <div className="types">
                  {this.state.types.map(type => {
                    return ( <div className={type.type.name}>{type.type.name}</div> )                
                    })}
                </div>

                <div className="details">
                    <div className="stats">
                        <h3>Stats</h3>
                        <div className="hp"><p>HP: {this.state.stats.hp}</p></div>
                        <div className="attack"><p>Attack: {this.state.stats.attack}</p></div>
                        <div className="defense"><p>Defense: {this.state.stats.defense}</p></div>
                        <div className="speed"><p>Speed: {this.state.stats.speed}</p></div>
                        <div className="specialAttack"><p>SP Attack: {this.state.stats.specialAttack}</p></div>
                        <div className="specialDefense"><p>SP Defense: {this.state.stats.specialDefense}</p></div>
                    </div>
                    <div className="profile">
                        <h3>Flavour</h3>
                        <div className="Description"><p>{this.state.description}</p></div>
                        <div className="Height"><p>Height: {pokemon.height}</p></div>
                        <div className="Weight"><p>Weight: {pokemon.weight}</p></div>
                        <div className="Abilities">
                            <p>Abilities:
                            {this.state.abilities.map(ability => {
                                return ( <span> {ability.ability.name}</span>)
                            })}
                             </p>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
