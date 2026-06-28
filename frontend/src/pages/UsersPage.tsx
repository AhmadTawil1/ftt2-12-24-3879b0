import React, { useState, useEffect } from 'react'
import { getUsers, createUser, updateUser, deleteUser } from '../api'
import type { User } from '../types'

const EMPTY: Omit<User, 'id'> = { role: '', height: null }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [form, setForm] = useState<Omit<User, 'id'>>(EMPTY)
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const load = () =>
    getUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users'))

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (editId !== null) {
        await updateUser(editId, form)
        setEditId(null)
      } else {
        await createUser(form)
      }
      setForm(EMPTY)
      load()
    } catch {
      setError('Save failed')
    }
  }

  const handleEdit = (u: User) => {
    setEditId(u.id)
    setForm({ role: u.role, height: u.height })
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      load()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <div>
      <div className="page-title">Users</div>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-card">
        <h3>{editId !== null ? 'Edit User' : 'New User'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Role</label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. therapist"
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="number"
                step="0.01"
                value={form.height ?? ''}
                onChange={(e) =>
                  setForm({ ...form, height: e.target.value ? parseFloat(e.target.value) : null })
                }
                placeholder="e.g. 175"
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
            <th>Role</th>
            <th>Height</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.role}</td>
              <td>{u.height ?? '—'}</td>
              <td>
                <div className="actions-cell">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>No records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}