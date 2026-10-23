import { useEffect, useRef, useState } from 'react'
import PokemonImage from './PokemonImage'
import TypeBadges from './TypeBadges'
import StatList from './StatList'
import { formatId } from '../utils/pokemon'
import { getPokemonArtwork } from '../services/pokeapi'

export default function PokemonDetails({ pokemon, trainers, onClose }) {
  const dialogRef = useRef(null)
  const [artwork, setArtwork] = useState(pokemon.image)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])

  useEffect(() => {
    let ignore = false
    getPokemonArtwork(pokemon.id).then(image => {
      if (!ignore && image) setArtwork(image)
    }).catch(() => {  })
    return () => { ignore = true }
  }, [pokemon.id])

  const owners = trainers.filter(trainer => trainer.pokemonIds.includes(pokemon.id))

  return <dialog ref={dialogRef} className="pokemon-dialog" onCancel={onClose} onClick={event => {
    if (event.target === event.currentTarget) onClose()
  }} aria-labelledby="detail-title">
    <div className="detail-layout" style={{ '--primary': pokemon.backgroundColors[0], '--secondary': pokemon.backgroundColors[1] || pokemon.backgroundColors[0] }}>
      <button className="close-button" onClick={onClose} aria-label="Fechar detalhes" autoFocus>×</button>
      <div className="detail-art"><span className="eyebrow">POKÉDEX / {formatId(pokemon.id)}</span><PokemonImage pokemon={pokemon} src={artwork} width="400" height="400" /></div>
      <div className="detail-content"><span className="eyebrow">CONHEÇA SEU POKÉMON</span><h2 id="detail-title">{pokemon.name}</h2><TypeBadges types={pokemon.types} />
        <h3>Atributos base <span>{Object.values(pokemon.stats).reduce((sum, stat) => sum + stat, 0)} total</span></h3><StatList stats={pokemon.stats} />
        <div className="detail-trainers"><h3>Treinadores relacionados</h3><p>{owners.length ? owners.map(owner => owner.name).join(' · ') : 'Nenhum treinador relacionado nos dados.'}</p></div>
      </div>
    </div>
  </dialog>
}
