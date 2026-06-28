import React, { useState } from 'react'
import './App.css'
import UsersPage from './pages/UsersPage'
import ChildrenPage from './pages/ChildrenPage'
import DiagnosesPage from './pages/DiagnosesPage'
import PostnatalGrowthAnalysesPage from './pages/PostnatalGrowthAnalysesPage'
import TreatmentProtocolsPage from './pages/TreatmentProtocolsPage'
import ImplicationSetsPage from './pages/ImplicationSetsPage'
import ProcessesPage from './pages/ProcessesPage'

type Page =
  | 'users'
  | 'children'
  | 'diagnoses'
  | 'postnatal'
  | 'treatments'
  | 'implications'
  | 'processes'

const NAV_ITEMS: { key: Page; label: string }[] = [
  { key: 'users', label: 'Users' },
  { key: 'children', label: 'Children' },
  { key: 'diagnoses', label: 'Diagnoses' },
  { key: 'postnatal', label: 'Postnatal Growth Analyses' },
  { key: 'treatments', label: 'Treatment Protocols' },
  { key: 'implications', label: 'Implication Sets' },
  { key: 'processes', label: 'Processes' },
]

export default function App() {
  const [page, setPage] = useState<Page>('users')

  return (
    <div className="app-container">
      <nav>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={page === item.key ? 'active' : ''}
            onClick={() => setPage(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {page === 'users' && <UsersPage />}
      {page === 'children' && <ChildrenPage />}
      {page === 'diagnoses' && <DiagnosesPage />}
      {page === 'postnatal' && <PostnatalGrowthAnalysesPage />}
      {page === 'treatments' && <TreatmentProtocolsPage />}
      {page === 'implications' && <ImplicationSetsPage />}
      {page === 'processes' && <ProcessesPage />}
    </div>
  )
}