import React, { useState, useEffect } from 'react'
import {
  getImplicationSets,
  createImplicationSet,
  updateImplicationSet,
  deleteImplicationSet,
} from '../api'
import type { ImplicationSet } from '../types'

const EMPTY: Omit<ImplicationSet, 'id'> = {
  diagnosisId: null,
  description: null,
}

export default function ImplicationSetsPage() {
  const [items, setItems] = useState<ImplicationSet[]>([])
  const [form, setForm] = useState<Omit<ImplicationSet, 'id'>>(EMPTY)
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const load = () =>
    getImplicationSets()
      .then(setItems)
      .catch(() => setError('Failed to load implication sets'))

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (editId !== null) {
        await updateImplicationSet(editId, form)
        setEditId(null)
      } else {
        await createImplicationSet(form)
      }
      setForm(EMPTY)
      load()
    } catch {
      setError('Save failed')
    }
  }

  const handleEdit = (item: ImplicationSet) => {
    setEditId(item.id)
    setForm({ diagnosisId: item.diagnosisId, description: item.description })
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteImplicationSet(id)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <div>
      <div className="page-title">Implication Sets</div>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-card">
        <h3>{editId !== null ? 'Edit Implication Set' : 'New Implication Set'}</h3>
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
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={form.description ?? ''}
                onChange={(e) => setForm({ ...form, description: e.target.value || null })}
                rows={4}
                placeholder="Clinical implication description..."
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
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.diagnosisId ?? '—'}</td>
              <td style={{ maxWidth: 400 }}>{item.description ?? '—'}</td>
              <td>
                <div className="actions-cell">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>No records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}