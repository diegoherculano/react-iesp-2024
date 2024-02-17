import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function PokemonDetail() {
  // https://pokeapi.co/api/v2/pokemon/bulbasaur
  const {name} = useParams()
  const [pokemon, setPokemon] = useState<any>()

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(resp => resp.json())
      .then((response) => {
        setPokemon(response)
      })
  }, [name]);

  return <div>
    <h1
      style={{
        textTransform: "capitalize"
      }}
    >
      {pokemon?.name}
    </h1>
    <img
      src={pokemon?.sprites.other.home.front_default}
      alt={pokemon?.name}
    />
  </div>
}

export default PokemonDetail