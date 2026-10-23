import { STAT_LABELS } from '../utils/pokemon'

export default function StatList({ stats, compact = false }) {
  return <dl className={compact ? 'stats stats-compact' : 'stats'}>
    {Object.entries(STAT_LABELS).map(([key, label]) => (
      <div className="stat" key={key}>
        <dt>{label}</dt><dd>{stats[key]}</dd>
        {!compact && <div className="stat-track" aria-hidden="true"><span style={{ width: `${Math.min(stats[key] / 255 * 100, 100)}%` }} /></div>}
      </div>
    ))}
  </dl>
}
