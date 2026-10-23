import PokemonImage from './PokemonImage'
import TypeBadges from './TypeBadges'
import StatList from './StatList'
import { formatId } from '../utils/pokemon'
import HoloCard from './HoloCard'

export default function PokemonCard({ pokemon, onSelect }) {
  return <HoloCard className="pokemon-card" onClick={() => onSelect(pokemon)} preset="cosmos" intensity={0.7} glare={0.25} edgeSparkle={0.45} foilColor={pokemon.backgroundColors[0]} idle={false} shadow={false} tiltMax={9} hoverScale={1.025} radius={18} style={{ '--primary': pokemon.backgroundColors[0], '--secondary': pokemon.backgroundColors[1] || pokemon.backgroundColors[0] }}>
    <span className="card-number">{formatId(pokemon.id)}<span aria-hidden="true">↗</span></span>
    <div className="card-art"><PokemonImage pokemon={pokemon} loading="lazy" width="240" height="240" /></div>
    <div className="card-content"><h3>{pokemon.name}</h3><TypeBadges types={pokemon.types} /><StatList stats={pokemon.stats} compact /></div>
  </HoloCard>
}
