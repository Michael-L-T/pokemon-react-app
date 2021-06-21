import React, { Component } from 'react';

export default class Pokemon extends Component {

    state = {
        data: [],
        sprites: [],
        types: [],
        stats: [],
        description: '',
        abilities: '',
        eggGroups: '',
        generation: '',
        captureRate: '',
    }

    /* populate state data after mount */
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

        let abilities = data.abilities.map(ability => {
            return ( ability.ability.name )
        })
        abilities = abilities.join(", ");
        this.setState( {abilities} );

        let speciesRes = await fetch(pokemonSpeciesUrl);
        let speciesData = await speciesRes.json();

        /* get flavor text, filter for english entries only and select the first one */
        const flavorText = speciesData.flavor_text_entries;
        let enFlavorText = [];
        flavorText.forEach(text => {
            if (text.language.name === 'en') {
                enFlavorText.push(text.flavor_text);
            }
        });
        const description = enFlavorText[0];
        this.setState({description});

        let eggGroups = speciesData.egg_groups.map(group => {
            return ( group.name )
        })
        eggGroups = eggGroups.join(", ");
        this.setState({eggGroups});

        const generation = speciesData.generation.name;
        this.setState({generation});

        const captureRate = speciesData.capture_rate;
        this.setState({captureRate});
    }


    render() {
        const pokemon = this.state.data;
        return (
            <div className="PokemonProfile" id={pokemon.name} key={pokemon.name}>


                <div className="basics row">
                    <div className="img">
                        <img src={this.state.sprites.front_default} alt="" />
                        <img src={this.state.sprites.back_default} alt="" />
                        </div>
                    <div className="id"><h2>{pokemon.name} (#{pokemon.id})</h2></div>

                    <div className="types">
                    {this.state.types.map(type => {
                        return ( <div className={type.type.name}>{type.type.name}</div> )                
                        })}
                    </div>
                </div>

                <div className="stats-title row">
                    <h4>Stats</h4>
                </div>
                <div className="stats row">
                    <div className="col-md-6">
                        <div className="hp"><p>HP: {this.state.stats.hp}</p></div>
                        <div className="attack"><p>Attack: {this.state.stats.attack}</p></div>
                        <div className="defense"><p>Defense: {this.state.stats.defense}</p></div>
                    </div>
                    <div className="col-md-6">
                        <div className="speed"><p>Speed: {this.state.stats.speed}</p></div>
                        <div className="specialAttack"><p>SP Attack: {this.state.stats.specialAttack}</p></div>
                        <div className="specialDefense"><p>SP Defense: {this.state.stats.specialDefense}</p></div>
                    </div>
                </div>

                <div className="profile-title row">
                    <h4>Profile</h4>
                </div>
                <div className="description row">
                <div className="Description"><p>{this.state.description}</p></div>

                </div>

                <div className="profile row">
                    <div className="col-md-6">
                        <div className="Height"><p>Height: {pokemon.height}</p></div>
                        <div className="Weight"><p>Weight: {pokemon.weight}</p></div>
                        <div className="Abilities"><p>Abilities: {this.state.abilities}</p></div>
                    </div>
                    <div className="col-md-6">
                        <div className="Egg-groups"><p>Egg groups: {this.state.eggGroups}</p></div>
                        <div className="Generation"><p>Generation: {this.state.generation}</p></div>
                        <div className="CaptureRate"><p>Capture Rate: {this.state.captureRate}</p></div>
                    </div>
                </div>
            </div>

        )
    }
}
