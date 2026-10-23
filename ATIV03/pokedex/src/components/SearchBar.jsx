import { STAT_LABELS } from '../utils/pokemon'

export default function SearchBar({ query, type, sort, types, onQuery, onType, onSort }) {
  return <div className="search-toolbar">
    <label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Pesquisar por nome ou ID</span>
      <input type="search" value={query} onChange={event => onQuery(event.target.value)} placeholder="Pesquisar por nome ou número…" />
      <kbd aria-hidden="true">#001</kbd>
    </label>
    <label className="select-field"><span>Tipo</span><select value={type} onChange={event => onType(event.target.value)}>
      <option value="">Todos os tipos</option>{types.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
    </select></label>
    <label className="select-field"><span>Ordenar por</span><select value={sort} onChange={event => onSort(event.target.value)}>
      <option value="id">Número ↑</option><option value="name">Nome A–Z</option>
      {Object.entries(STAT_LABELS).map(([key, label]) => <option key={key} value={key}>{label} ↓</option>)}
    </select></label>
  </div>
}
