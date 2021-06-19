import React, { Component } from 'react'
import PokemonList from '../pokedata/PokemonList'

export default class MainGrid extends Component {
    render() {
        return (
            <div id="main-grid">
                <PokemonList/>
            </div>
        )
    }
}
