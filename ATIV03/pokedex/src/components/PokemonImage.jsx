import { FALLBACK_IMAGE } from '../utils/pokemon'

export default function PokemonImage({ pokemon, src, ...props }) {
  return <img
    {...props}
    src={src || pokemon.image}
    alt={pokemon.name}
    onError={event => {
      if (event.currentTarget.getAttribute('src') !== FALLBACK_IMAGE) {
        event.currentTarget.src = FALLBACK_IMAGE
      }
    }}
  />
}
