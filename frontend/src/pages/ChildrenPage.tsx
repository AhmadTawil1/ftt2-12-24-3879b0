import React, { useState, useEffect } from 'react'
import { getChildren, createChild, updateChild, deleteChild } from '../api'
import type { Child } from '../types'

const EMPTY: Omit<Child, 'id'> = {
  currentWeight: null,
  age: null,
  gender: null,
  perinatalParameters: null,
  postnatalParameters: null,
}

export default function ChildrenPage() {
  const [items, setItems] = useState<Child[]>([])
  const [form, setForm] = useState<Omit<Child, 'id'>>(EMPTY)
  const [perinatalRaw, setPerinatalRaw] = useState('{}')
  const [postnatalRaw, setPostnatalRaw] = useState('{}')
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const load = () =>
    getChildren()
      .then(setItems)
      .catch(() => setError('Failed to load children'))

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    let perinatal: Record<string, unknown> | null = null
    let postnatal: Record<string, unknown> | null = null
    try {
      perinatal = JSON.parse(perinatalRaw)
      postnatal = JSON.parse(postnatalRaw)
    } catch {
      setError('Invalid JSON in parameters')
      return
    }
    const payload = { ...form, perinatalParameters: perinatal, postnatalParameters: postnatal }
    try {
      if (editId !== null) {
        await updateChild(editId, payload)
        setEditId(null)
      } else {
        await createChild(payload)
      }
      setForm(EMPTY)
      setPerinatalRaw('{}')
      setPostnatalRaw('{}')
      load()
    } catch {
      setError('Save failed')
    }
  }

  const handleEdit = (c: Child) => {
    setEditId(c.id)
    setForm({
      currentWeight: c.currentWeight,
      age: c.age,
      gender: c.gender,
      perinatalParameters: c.perinatalParameters,
      postnatalParameters: c.postnatalParameters,
    })
    setPerinatalRaw(JSON.stringify(c.perinatalParameters ?? {}, null, 2))
    setPostnatalRaw(JSON.stringify(c.postnatalParameters ?? {}, null, 2))
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteChild(id)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <div>
      <div className="page-title">Children</div>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-card">
        <h3>{editId !== null ? 'Edit Child' : 'New Child'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Weight (kg)</label>
              <input
                type="number"
                step="0.01"
                value={form.currentWeight ?? ''}
                onChange={(e) =>
                  setForm({ ...form, currentWeight: e.target.value ? parseFloat(e.target.value) : null })
                }
              />
            </div>
            <div className="form-group">
              <label>Age (months)</label>
              <input
                type="number"
                step="1"
                value={form.age ?? ''}
                onChange={(e) =>
                  setForm({ ...form, age: e.target.value ? parseInt(e.target.value) : null })
                }
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={form.gender ?? ''}
                onChange={(e) => setForm({ ...form, gender: e.target.value || null })}
              >
                <option value="">— select —</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Perinatal Parameters (JSON)</label>
              <textarea
                value={perinatalRaw}
                onChange={(e) => setPerinatalRaw(e.target.value)}
                rows={4}
              />
            </div>
            <div className="form-group full-width">
              <label>Postnatal Parameters (JSON)</label>
              <textarea
                value={postnatalRaw}
                onChange={(e) => setPostnatalRaw(e.target.value)}
                rows={4}
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
                setPerinatalRaw('{}')
                setPostnatalRaw('{}')
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
            <th>Weight</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Perinatal Params</th>
            <th>Postnatal Params</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.currentWeight ?? '—'}</td>
              <td>{c.age ?? '—'}</td>
              <td>{c.gender ?? '—'}</td>
              <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {JSON.stringify(c.perinatalParameters)}
              </td>
              <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {JSON.stringify(c.postnatalParameters)}
              </td>
              <td>
                <div className="actions-cell">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(c)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
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