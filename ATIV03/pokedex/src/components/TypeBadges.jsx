import { TYPE_COLORS } from '../data/pokemon-type-colors'

export default function TypeBadges({ types }) {
  return <div className="type-badges">{types.map(type => (
    <span key={type.id} className="type-badge" style={{ '--type-color': TYPE_COLORS[type.name.toLowerCase()] || TYPE_COLORS.unknown }}>
      <i aria-hidden="true" />{type.name}
    </span>
  ))}</div>
}
