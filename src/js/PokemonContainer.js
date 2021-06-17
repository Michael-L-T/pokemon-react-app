export default function PokemonContainer({ pokemonList }) {
    return (
      <div>
        {pokemonList.map(p => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div>
    )
  }