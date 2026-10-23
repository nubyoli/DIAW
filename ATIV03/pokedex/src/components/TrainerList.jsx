import PokemonImage from './PokemonImage'

export default function TrainerList({ trainers, pokemon, onSelect }) {
  const byId = new Map(pokemon.map(item => [item.id, item]))
  return <div className="trainer-grid">{trainers.map(trainer => (
    <article className="trainer-card" key={trainer.id}>
      <div className="trainer-heading"><span className="trainer-avatar" aria-hidden="true">{trainer.name.slice(0, 1)}</span><div><h3>{trainer.name}</h3><p>{trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}</p></div><span className="badge-icon" aria-hidden="true">✦</span></div>
      <p className="eyebrow">EQUIPE · {trainer.pokemonIds.length} POKÉMON</p>
      <div className="trainer-team">{trainer.pokemonIds.map(id => {
        const member = byId.get(id)
        return member && <button key={id} onClick={() => onSelect(member)}><PokemonImage pokemon={member} width="72" height="72" loading="lazy" /><span>{member.name}</span></button>
      })}</div>
    </article>
  ))}</div>
}
