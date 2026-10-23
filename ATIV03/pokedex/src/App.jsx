import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import SearchBar from './components/SearchBar'
import PokemonCard from './components/PokemonCard'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import { createCatalog, filterPokemon } from './utils/pokemon'
import './App.css'

const catalog = createCatalog(data)
const PAGE_SIZE = 18

function App() {
  const [tab, setTab] = useState('pokedex')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState('id')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const filtered = useMemo(() => filterPokemon(catalog, { query, type, sort }), [query, type, sort])
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pages)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const changeFilter = setter => value => { setter(value); setPage(1) }
  const resetFilters = () => { setQuery(''); setType(''); setSort('id'); setPage(1) }

  return <div className="app-shell">
    <header className="site-header">
      <a className="brand" href="#" onClick={event => { event.preventDefault(); setTab('pokedex') }} aria-label="Pokédex, página inicial"><span className="pokeball" aria-hidden="true" />poké<span>dex</span></a>
      <nav aria-label="Navegação principal"><button className={tab === 'pokedex' ? 'nav-link active' : 'nav-link'} aria-pressed={tab === 'pokedex'} onClick={() => setTab('pokedex')}>Pokédex</button><button className={tab === 'trainers' ? 'nav-link active' : 'nav-link'} aria-pressed={tab === 'trainers'} onClick={() => setTab('trainers')}>Treinadores</button></nav>
      <span className="header-tag"><i />Geração 01</span>
    </header>

    <main className="main-content">
      <h1 className="sr-only">{tab === 'pokedex' ? 'Pokédex' : 'Treinadores'}</h1>
      {tab === 'pokedex' ? <section aria-label="Explorar Pokémon">
        <SearchBar query={query} type={type} sort={sort} types={data.types} onQuery={changeFilter(setQuery)} onType={changeFilter(setType)} onSort={changeFilter(setSort)} />
        <div className="results-toolbar"><div><h2>Explore a coleção<span className="count-chip">{filtered.length}</span></h2><p role="status">{filtered.length === 0 ? 'Nenhum Pokémon encontrado' : `${filtered.length} de ${catalog.length} Pokémon`}{type ? ` · ${type}` : ''}</p></div>
          <div className="view-controls"><button className="random-button" disabled={!filtered.length} onClick={() => setSelected(filtered[Math.floor(Math.random() * filtered.length)])}>⚄ <span>Surpreenda-me</span></button></div>
        </div>
        {!filtered.length ? <div className="empty-state"><span aria-hidden="true">⌕</span><h3>Nenhum Pokémon por aqui.</h3><p>Tente outro nome, número ou tipo para continuar explorando.</p><button className="primary-button" onClick={resetFilters}>Limpar filtros</button></div> : <>
          <div className="pokemon-grid">{visible.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={setSelected} />)}</div>
          <div className="pagination"><span>Exibindo {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} de {filtered.length}</span><div><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Página anterior">← Anterior</button><span>Página {currentPage} de {pages}</span><button disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)} aria-label="Próxima página">Próxima →</button></div></div>
        </>}
      </section> : <section aria-label="Lista de treinadores"><div className="results-toolbar"><div><h2>Treinadores<span className="count-chip">{data.trainers.length}</span></h2><p>Selecione um Pokémon da equipe para conhecê-lo.</p></div></div><TrainerList trainers={data.trainers} pokemon={catalog} onSelect={setSelected} /></section>}
    </main>
    {selected && <PokemonDetails key={selected.id} pokemon={selected} trainers={data.trainers} onClose={() => setSelected(null)} />}
  </div>
}

export default App
