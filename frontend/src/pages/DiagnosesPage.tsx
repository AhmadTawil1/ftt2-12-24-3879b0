import React, { useState, useEffect } from 'react'
import { getDiagnoses, createDiagnosis, updateDiagnosis, deleteDiagnosis } from '../api'
import type { Diagnosis } from '../types'

const EMPTY: Omit<Diagnosis, 'id'> = {
  childId: null,
  fetalBirthWeightIndication: null,
  fetalGrowthIndication: null,
  postnatalGrowthIndication: null,
  firstTrimesterPi: null,
  lastTrimesterPi: null,
  birthPercentile: null,
  month6Percentile: null,
  month12Percentile: null,
  month18Percentile: null,
  month24Percentile: null,
  month36Percentile: null,
  month48Percentile: null,
  month60Percentile: null,
}

export default function DiagnosesPage() {
  const [items, setItems] = useState<Diagnosis[]>([])
  const [form, setForm] = useState<Omit<Diagnosis, 'id'>>(EMPTY)
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const load = () =>
    getDiagnoses()
      .then(setItems)
      .catch(() => setError('Failed to load diagnoses'))

  useEffect(() => { load() }, [])

  const set = (field: keyof typeof EMPTY, value: string) => {
    const numFields: (keyof typeof EMPTY)[] = ['childId', 'firstTrimesterPi', 'lastTrimesterPi']
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
        await updateDiagnosis(editId, form)
        setEditId(null)
      } else {
        await createDiagnosis(form)
      }
      setForm(EMPTY)
      load()
    } catch {
      setError('Save failed')
    }
  }

  const handleEdit = (d: Diagnosis) => {
    setEditId(d.id)
    setForm({ ...d })
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteDiagnosis(id)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  const fields: { key: keyof typeof EMPTY; label: string; type?: string }[] = [
    { key: 'childId', label: 'Child ID', type: 'number' },
    { key: 'fetalBirthWeightIndication', label: 'Fetal Birth Weight Indication' },
    { key: 'fetalGrowthIndication', label: 'Fetal Growth Indication' },
    { key: 'postnatalGrowthIndication', label: 'Postnatal Growth Indication' },
    { key: 'firstTrimesterPi', label: 'First Trimester PI', type: 'number' },
    { key: 'lastTrimesterPi', label: 'Last Trimester PI', type: 'number' },
    { key: 'birthPercentile', label: 'Birth Percentile' },
    { key: 'month6Percentile', label: '6-month Percentile' },
    { key: 'month12Percentile', label: '12-month Percentile' },
    { key: 'month18Percentile', label: '18-month Percentile' },
    { key: 'month24Percentile', label: '24-month Percentile' },
    { key: 'month36Percentile', label: '36-month Percentile' },
    { key: 'month48Percentile', label: '48-month Percentile' },
    { key: 'month60Percentile', label: '60-month Percentile' },
  ]

  return (
    <div>
      <div className="page-title">Diagnoses</div>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-card">
        <h3>{editId !== null ? 'Edit Diagnosis' : 'New Diagnosis'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {fields.map((f) => (
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
            <th>Child ID</th>
            <th>Fetal BW Ind.</th>
            <th>Fetal Growth Ind.</th>
            <th>Postnatal Growth Ind.</th>
            <th>1st Tri PI</th>
            <th>Last Tri PI</th>
            <th>Birth %ile</th>
            <th>6m %ile</th>
            <th>12m %ile</th>
            <th>18m %ile</th>
            <th>24m %ile</th>
            <th>36m %ile</th>
            <th>48m %ile</th>
            <th>60m %ile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.childId ?? '—'}</td>
              <td>{d.fetalBirthWeightIndication ?? '—'}</td>
              <td>{d.fetalGrowthIndication ?? '—'}</td>
              <td>{d.postnatalGrowthIndication ?? '—'}</td>
              <td>{d.firstTrimesterPi ?? '—'}</td>
              <td>{d.lastTrimesterPi ?? '—'}</td>
              <td>{d.birthPercentile ?? '—'}</td>
              <td>{d.month6Percentile ?? '—'}</td>
              <td>{d.month12Percentile ?? '—'}</td>
              <td>{d.month18Percentile ?? '—'}</td>
              <td>{d.month24Percentile ?? '—'}</td>
              <td>{d.month36Percentile ?? '—'}</td>
              <td>{d.month48Percentile ?? '—'}</td>
              <td>{d.month60Percentile ?? '—'}</td>
              <td>
                <div className="actions-cell">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(d)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={16} style={{ textAlign: 'center', color: '#999' }}>No records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}