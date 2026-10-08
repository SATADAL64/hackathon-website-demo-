import { useEffect, useState } from 'react'
import { Users, GitBranch, Activity, Search, RefreshCw } from 'lucide-react'

interface Registration {
  registration_id?: string
  registrationId?: string
  name: string
  email: string
  phone: string
  college: string
  year: string
  department: string
  github: string
  linkedin: string
  teamName?: string
  team_name?: string
  teamSize?: string
  team_size?: string
  track: string
  status: string
  createdAt?: string
  created_at?: string
}

interface Stats {
  total: number
  byTrack: { track: string; count: number }[]
  byStatus: { status: string; count: number }[]
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filterTrack, setFilterTrack] = useState('All')

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const [regRes, statsRes] = await Promise.all([
        fetch('/api/registrations'),
        fetch('/api/registrations/stats'),
      ])
      if (!regRes.ok) throw new Error('Backend not reachable')
      const regData = await regRes.json()
      const statsData = await statsRes.json()
      setRegistrations(regData.registrations || [])
      setStats(statsData)
    } catch {
      setError('Cannot connect to backend. Make sure the server is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const tracks = ['All', ...Array.from(new Set(registrations.map(r => r.track))).filter(Boolean)]

  const filtered = registrations.filter(r => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (r.teamName || r.team_name || '').toLowerCase().includes(q)
    const matchTrack = filterTrack === 'All' || r.track === filterTrack
    return matchSearch && matchTrack
  })

  return (
    <div style={{ minHeight: '100vh', background: '#050606', color: '#e8e6e3', fontFamily: "'Inter', sans-serif", padding: '2rem' }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#00ff41', letterSpacing: '0.2em', marginBottom: 4 }}>
              ~/the-last-commit/admin
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
              Registration Dashboard
            </h1>
          </div>
          <button
            onClick={fetchData}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 1.2rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#8a8a8a', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            <RefreshCw size={14} /> REFRESH
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)', padding: '1rem 1.5rem', marginBottom: '2rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#ff4444' }}>
            ✗ {error}
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard icon={<Users size={18} />} label="Total Registrations" value={stats.total} accent />
            {stats.byTrack.slice(0, 3).map(t => (
              <StatCard key={t.track} icon={<GitBranch size={18} />} label={t.track} value={t.count} />
            ))}
            <StatCard icon={<Activity size={18} />} label="Pending Review" value={stats.byStatus.find(s => s.status === 'pending')?.count ?? 0} />
          </div>
        )}

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200, border: '1px solid rgba(255,255,255,0.08)', padding: '0.6rem 1rem', background: '#0a0b0b' }}>
            <Search size={14} style={{ color: '#555' }} />
            <input
              placeholder="Search name, email, team..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#e8e6e3', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', width: '100%' }}
            />
          </div>
          <select
            value={filterTrack}
            onChange={e => setFilterTrack(e.target.value)}
            style={{ background: '#0a0b0b', border: '1px solid rgba(255,255,255,0.08)', color: '#8a8a8a', padding: '0.6rem 1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', cursor: 'pointer' }}
          >
            {tracks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#555' }}>
            Loading registrations...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#555' }}>
            {registrations.length === 0 ? '> No registrations yet.' : '> No results match your search.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['ID', 'Name', 'Email', 'College', 'Year', 'Team', 'Track', 'Date'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', color: '#555', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const id = r.registration_id || r.registrationId || `#${i + 1}`
                  const team = r.team_name || r.teamName || '—'
                  const date = r.created_at || r.createdAt
                  return (
                    <tr key={id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#0a0b0b')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '0.85rem 1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#00ff41' }}>{id}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 500 }}>{r.name}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#8a8a8a', fontSize: '0.82rem' }}>{r.email}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#8a8a8a', fontSize: '0.82rem' }}>{r.college}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#8a8a8a', fontSize: '0.82rem' }}>{r.year}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#8a8a8a', fontSize: '0.82rem' }}>{team}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ background: 'rgba(0,255,65,0.08)', border: '1px solid rgba(0,255,65,0.2)', color: '#00ff41', padding: '0.2rem 0.6rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                          {r.track}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#555', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace" }}>
                        {date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ padding: '0.75rem 1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#555', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              Showing {filtered.length} of {registrations.length} registrations
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent?: boolean }) {
  return (
    <div style={{ border: `1px solid ${accent ? 'rgba(0,255,65,0.2)' : 'rgba(255,255,255,0.06)'}`, padding: '1.25rem', background: accent ? 'rgba(0,255,65,0.04)' : '#0a0b0b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: accent ? '#00ff41' : '#555', marginBottom: 12 }}>
        {icon}
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em' }}>{label.toUpperCase()}</span>
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: accent ? '#00ff41' : '#e8e6e3' }}>{value}</div>
    </div>
  )
}
