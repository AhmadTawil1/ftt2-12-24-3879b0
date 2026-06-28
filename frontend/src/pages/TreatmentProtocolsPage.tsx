import React, { useState, useEffect } from 'react'
import {
  getTreatmentProtocols,
  createTreatmentProtocol,
  updateTreatmentProtocol,
  deleteTreatmentProtocol,
} from '../api'
import type { TreatmentProtocol } from '../types'

const EMPTY: Omit<TreatmentProtocol, 'id'> = {
  diagnosisId: null,
  dailyCaloricValue: null,
  medianWeight: null,
  multiCaloriesProducts: null,
  micronutrients: null,
}

export default function TreatmentProtocolsPage() {
  const [items, setItems] = useState<TreatmentProtocol[]>([])
  const [form, setForm] = useState<Omit<TreatmentProtocol, 'id'>>(EMPTY)
  const [multiRaw, setMultiRaw] = useState('{}')
  const [microRaw, setMicroRaw] = useState('{}')
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const load = () =>
    getTreatmentProtocols()
      .then(setItems)
      .catch(() => setError('Failed to load treatment protocols'))

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    let multi: Record<string, unknown> | null = null
    let micro: Record<string, unknown> | null = null
    try {
      multi = JSON.parse(multiRaw)
      micro = JSON.parse(microRaw)
    } catch {
      setError('Invalid JSON in products/micronutrients')
      return
    }
    const payload = { ...form, multiCaloriesProducts: multi, micronutrients: micro }
    try {
      if (editId !== null) {
        await updateTreatmentProtocol(editId, payload)
        setEditId(null)
      } else {
        await createTreatmentProtocol(payload)
      }
      setForm(EMPTY)
      setMultiRaw('{}')
      setMicroRaw('{}')
      load()
    } catch {
      setError('Save failed')
    }
  }

  const handleEdit = (item: TreatmentProtocol) => {
    setEditId(item.id)
    setForm({
      diagnosisId: item.diagnosisId,
      dailyCaloricValue: item.dailyCaloricValue,
      medianWeight: item.medianWeight,
      multiCaloriesProducts: item.multiCaloriesProducts,
      micronutrients: item.micronutrients,
    })
    setMultiRaw(JSON.stringify(item.multiCaloriesProducts ?? {}, null, 2))
    setMicroRaw(JSON.stringify(item.micronutrients ?? {}, null, 2))
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTreatmentProtocol(id)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <div>
      <div className="page-title">Treatment Protocols</div>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-card">
        <h3>{editId !== null ? 'Edit Protocol' : 'New Protocol'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Diagnosis ID</label>
              <input
                type="number"
                value={form.diagnosisId ?? ''}
                onChange={(e) =>
                  setForm({ ...form, diagnosisId: e.target.value ? parseInt(e.target.value) : null })
                }
              />
            </div>
            <div className="form-group">
              <label>Daily Caloric Value</label>
              <input
                type="number"
                step="0.01"
                value={form.dailyCaloricValue ?? ''}
                onChange={(e) =>
                  setForm({ ...form, dailyCaloricValue: e.target.value ? parseFloat(e.target.value) : null })
                }
              />
            </div>
            <div className="form-group">
              <label>Median Weight</label>
              <input
                type="number"
                step="0.01"
                value={form.medianWeight ?? ''}
                onChange={(e) =>
                  setForm({ ...form, medianWeight: e.target.value ? parseFloat(e.target.value) : null })
                }
              />
            </div>
            <div className="form-group full-width">
              <label>Multi-Calories Products (JSON)</label>
              <textarea
                value={multiRaw}
                onChange={(e) => setMultiRaw(e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group full-width">
              <label>Micronutrients (JSON)</label>
              <textarea
                value={microRaw}
                onChange={(e) => setMicroRaw(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            {editId !== null ? 'Update' : 'Create'}
          </button>
          {editId !== null && (
            <button
              className="btn btn-warning"
              type="button"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => {
                setEditId(null)
                setForm(EMPTY)
                setMultiRaw('{}')
                setMicroRaw('{}')
              }}
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
            <th>Daily Caloric Value</th>
            <th>Median Weight</th>
            <th>Multi-Cal Products</th>
            <th>Micronutrients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.diagnosisId ?? '—'}</td>
              <td>{item.dailyCaloricValue ?? '—'}</td>
              <td>{item.medianWeight ?? '—'}</td>
              <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {JSON.stringify(item.multiCaloriesProducts)}
              </td>
              <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {JSON.stringify(item.micronutrients)}
              </td>
              <td>
                <div className="actions-cell">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={7} style={{ textAlign: 'center', color: '#999' }}>No records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}