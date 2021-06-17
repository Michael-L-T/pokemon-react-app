export default function PokemonContainer({ pokemon }) {
    return (
      <div id="main-grid">
        {pokemon.map(p => (
          <div className="PokemonContainer" id={p.name} key={p.name}>
              <div className="img"><img src={p.sprites.front_default} alt="" /></div>
              <div className="id">{p.name} ({p.id})</div>

              <div className="types">
                {p.types.map(type => {
                  return ( <div className={type.type.name}>{type.type.name}</div> )                
                  })}
              </div>
              
              <div className="Height">Height: {p.height}</div>
              <div className="Weight">Weight: {p.weight}</div>
          </div>
        ))}
      </div>
    )
  }