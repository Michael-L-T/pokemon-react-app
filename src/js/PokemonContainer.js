export default function PokemonContainer({ pokemon }) {
    return (
      <div id="main-grid">
        {pokemon.map(p => (
          <div className="PokemonContainer" id={p.name} key={p.name}>
              <div className="img"><img src={p.sprites.front_default} alt="" /></div>
              <div className="id">{p.name} ({p.id})</div>
              <div className="Height">Height: {p.height}0 cm</div>
              <div className="Weight">Weight: {p.weight}00 g</div>
          </div>
        ))}
      </div>
    )
  }