import React, { useState, useEffect } from 'react'
import {
  getPostnatalGrowthAnalyses,
  createPostnatalGrowthAnalysis,
  updatePostnatalGrowthAnalysis,
  deletePostnatalGrowthAnalysis,
} from '../api'
import type { PostnatalGrowthAnalysis } from '../types'

const EMPTY: Omit<PostnatalGrowthAnalysis, 'id'> = {
  diagnosisId: null,
  majorPercentilesCrossed: null,
  severity: null,
  lastPercentileAge: null,
  period1PercentilesCrossed: null,
  lastPercentileAgePeriod1: null,
  period2PercentilesCrossed: null,
  lastPercentileAgePeriod2: null,
  period3PercentilesCrossed: null,
}

type FieldDef = { key: keyof typeof EMPTY; label: string; type?: string }

const FIELDS: FieldDef[] = [
  { key: 'diagnosisId', label: 'Diagnosis ID', type: 'number' },
  { key: 'majorPercentilesCrossed', label: 'Major Percentiles Crossed', type: 'number' },
  { key: 'severity', label: 'Severity', type: 'number' },
  { key: 'lastPercentileAge', label: 'Last Percentile Age' },
  { key: 'period1PercentilesCrossed', label: 'Period 1 Percentiles Crossed', type: 'number' },
  { key: 'lastPercentileAgePeriod1', label: 'Last Percentile Age Period 1' },
  { key: 'period2PercentilesCrossed', label: 'Period 2 Percentiles Crossed', type: 'number' },
  { key: 'lastPercentileAgePeriod2', label: 'Last Percentile Age Period 2' },
  { key: 'period3PercentilesCrossed', label: 'Period 3 Percentiles Crossed', type: 'number' },
]

export default function PostnatalGrowthAnalysesPage() {
  const [items, setItems] = useState<PostnatalGrowthAnalysis[]>([])
  const [form, setForm] = useState<Omit<PostnatalGrowthAnalysis, 'id'>>(EMPTY)
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const load = () =>
    getPostnatalGrowthAnalyses()
      .then(setItems)
      .catch(() => setError('Failed to load analyses'))

  useEffect(() => { load() }, [])

  const set = (field: keyof typeof EMPTY, value: string) => {
    const numFields: (keyof typeof EMPTY)[] = [
      'diagnosisId', 'majorPercentilesCrossed', 'severity',
      'period1PercentilesCrossed', 'period2PercentilesCrossed', 'period3PercentilesCrossed',
    ]
    if (numFields.includes(field)) {
      setForm((f) => ({ ...f, [field]: value ? parseFloat(value) : null }))
    } else {
      setForm((f) => ({ ...f, [field]: value || null }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (editId !== null) {
        await updatePostnatalGrowthAnalysis(editId, form)
        setEditId(null)
      } else {
        await createPostnatalGrowthAnalysis(form)
      }
      setForm(EMPTY)
      load()
    } catch {
      setError('Save failed')
    }
  }

  const handleEdit = (item: PostnatalGrowthAnalysis) => {
    setEditId(item.id)
    setForm({ ...item })
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePostnatalGrowthAnalysis(id)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <div>
      <div className="page-title">Postnatal Growth Analyses</div>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-card">
        <h3>{editId !== null ? 'Edit Analysis' : 'New Analysis'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {FIELDS.map((f) => (
              <div className="form-group" key={f.key}>
                <label>{f.label}</label>
                <input
                  type={f.type ?? 'text'}
                  step={f.type === 'number' ? '0.01' : undefined}
                  value={form[f.key] ?? ''}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary" type="submit">
            {editId !== null ? 'Update' : 'Create'}
          </button>
          {editId !== null && (
            <button
              className="btn btn-warning"
              type="button"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => { setEditId(null); setForm(EMPTY) }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Diagnosis ID</th>
            <th>Major %iles Crossed</th>
            <th>Severity</th>
            <th>Last %ile Age</th>
            <th>P1 %iles</th>
            <th>Last Age P1</th>
            <th>P2 %iles</th>
            <th>Last Age P2</th>
            <th>P3 %iles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.diagnosisId ?? '—'}</td>
              <td>{item.majorPercentilesCrossed ?? '—'}</td>
              <td>{item.severity ?? '—'}</td>
              <td>{item.lastPercentileAge ?? '—'}</td>
              <td>{item.period1PercentilesCrossed ?? '—'}</td>
              <td>{item.lastPercentileAgePeriod1 ?? '—'}</td>
              <td>{item.period2PercentilesCrossed ?? '—'}</td>
              <td>{item.lastPercentileAgePeriod2 ?? '—'}</td>
              <td>{item.period3PercentilesCrossed ?? '—'}</td>
              <td>
                <div className="actions-cell">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={11} style={{ textAlign: 'center', color: '#999' }}>No records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}