import { TYPE_COLORS } from '../data/pokemon-type-colors.js'

export const STAT_LABELS = {
  hp: 'HP', attack: 'Ataque', defense: 'Defesa',
  specialAttack: 'Atq. especial', specialDefense: 'Def. especial', speed: 'Velocidade',
}

export const formatId = id => `#${String(id).padStart(3, '0')}`
export const artworkUrl = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
export const FALLBACK_IMAGE = '/pokemon-placeholder.svg'

export function createCatalog(data) {
  return data.pokemon.map(pokemon => ({
    ...pokemon,
    image: artworkUrl(pokemon.id),
    text: `${formatId(pokemon.id)} · ${pokemon.name}`,
    description: pokemon.types.map(type => type.name).join(' / '),
    backgroundColors: pokemon.types.map(type => TYPE_COLORS[type.name.toLowerCase()] || TYPE_COLORS.unknown),
  }))
}

export function filterPokemon(pokemon, { query = '', type = '', sort = 'id' } = {}) {
  const term = query.trim().toLowerCase().replace(/^#/, '')
  const result = pokemon.filter(item => (
    (!term || item.name.toLowerCase().includes(term) || (Number.isInteger(Number(term)) && item.id === Number(term)))
    && (!type || item.types.some(itemType => itemType.name === type))
  ))
  return result.sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (sort === 'id') return a.id - b.id
    return (b.stats[sort] - a.stats[sort]) || a.id - b.id
  })
}
