const API_URL = 'https://pokeapi.co/api/v2/pokemon'
const cache = new Map()

// Cacheia consultas e requisições em andamento, inclusive no StrictMode.
export function getPokemonArtwork(id) {
  if (!cache.has(id)) {
    const request = fetch(`${API_URL}/${id}/`, { signal: AbortSignal.timeout(10000) })
      .then(response => {
        if (!response.ok) throw new Error(`PokéAPI: HTTP ${response.status}`)
        return response.json()
      })
      .then(pokemon => pokemon.sprites.front_default)
      .catch(error => {
        cache.delete(id)
        throw error
      })
    cache.set(id, request)
  }
  return cache.get(id)
}
