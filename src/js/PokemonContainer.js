export default function PokemonContainer({ pokemon }) {
    return (
      <div className="grid-container">
        {pokemon.map(p => (
          <div class="PokemonContainer" id={p.name} key={p.name}>
              <div class="img"><img src={p.sprites.front_default} alt="" /></div>
              <div class="id">{p.name} ({p.id})</div>
          </div>
        ))}
      </div>
    )
  }